import {
  RawCell, LiteralCell, NotEmptyCell, Dict, Dicts, Data, Opts, WorkbookReaderError, ImportHeader,
  XlsxPopulateWorkbook, XlsxPopulateWorksheet, XlsxPopulateRichTextCell
} from './types';
import { Combiner } from './combiner';
import { dateParse, formatDate } from '../utils/date';

export const reverseDict = (dict: Dict): Dict => Object.keys(dict).reduce((newDict, key) => {
  newDict[dict[key]] = key;
  return newDict;
}, <Dict>{});

export function numberValidator(value: LiteralCell, min?: any, max?: any, toFixedNumber?: any) {
  if (typeof value === 'number') {
    const valueToNumber = Number(value);
    if (min !== undefined && min > valueToNumber) return `应大于等于${min}`;
    if (max !== undefined && max < valueToNumber) return `应小于等于${max}`;
    if (toFixedNumber) {
      return true;
    }
    return true;
  }
  return '应为数字类型';
}

export function integerValidator(value: LiteralCell, min?: any, max?: any) {
  const isNumber = numberValidator(value);
  if (typeof isNumber === 'string') return isNumber;
  if (Number.isInteger(<number>value)) {
    const valueToNumber = Number(value);
    if (min !== undefined && min > valueToNumber) return `应大于等于${min}`;
    if (max !== undefined && max < valueToNumber) return `应小于等于${max}`;
    return true;
  }
  return '应为整数';
}

export const nonZeroNumberFilter = (v: any): (any | '') => (!isNaN(Number(v)) && Number(v) !== 0 ? v : '');

export const valueToString = (value: RawCell): string => {
  switch (typeof value) {
    case 'number':
    case 'string':
      return (<number|string>value).toString();
    default:
      return JSON.stringify(value);
  }
}
export function valueToDate(value: RawCell) {
  switch (typeof value) {
    case 'number': {
      const num = (<number>value) - 1; // 这里就当作所有日期都在 bug day 1900-02-29 之后
      // const dateBase = new Date(1900, 0, 0); // chrome不同版本计算出来的数据不一致，直接固定写死一个数值，后续排查
      const dateBase = -2209104000000;
      const secondsInDay = 60 * 60 * 24;
      return new Date(Math.round(num * secondsInDay) * 1000 + dateBase);
    }
    case 'string': return dateParse(<string>value);
    default: return new Date(NaN);
  }
}
export const valueToSeconds = (value: RawCell) => {
  const date = valueToDate(value);
  if (isNaN(date.getTime())) {
    throw new Error('日期格式错误');
  }
  return Math.round(date.getTime() / 1000);
};
export const valueToDateString = (format: string) => (value: RawCell) => {
  const date = valueToDate(value);
  if (isNaN(date.getTime())) {
    throw new Error('日期格式错误');
  }
  return formatDate(date, format);
}

export const oaValidator = (value: LiteralCell) => {
  if (typeof value === 'string') {
    const result = /^([^/]*\/)?[a-zA-Z0-9.]+$/.exec(value);
    if (result && result[0] === value) return true;
  }
  return '请填写正确的 OA，如「张三/san.zhang」或「san.zhang」';
};

/**
 * @param {Array<{ name: 'r', children: Array<{ name: 't', children: string }> }>} cell
 */
function richTextCellToString(cell: XlsxPopulateRichTextCell) {
 if (Array.isArray(cell)) {
   return cell
     .filter(node => node.name === 'r') // => rNodes
     .map(rNode => rNode.children.filter(child => child.name === 't')) // => Array<Array<{ name: 't', ... }>>
     .map(tNodes => tNodes.map(tNode => { 
       const v = tNode.children[0]; 
       if (v || `${v}` === '0') return v;
       return '' 
      }).join('')) // => Array<string>
     .join('');
 }
 return '';
}

export abstract class WorkbookReader {
  errors: WorkbookReaderError[] = [];
  result: object[] = [];
  protected abstract headers: ImportHeader[] = [];
  protected readonly rowStartAt: number = 1;
  protected readonly abstract combiner: Combiner<RawCell[]>;
  protected abstract opts: Opts;
  protected sheet: XlsxPopulateWorksheet;

  read(wb: XlsxPopulateWorkbook): void {
    this.sheet = this.getSheet(wb);
    if (this.isSheetEmpty) {
      throw new Error('导入文件中无数据');
    }
    const rows: RawCell[][] = this.getRows(this.sheet);
    this.preCheck(rows, this.opts);
    if (this.hasError) return;

    let count = this.rowStartAt;
    const items = this.getGroups(rows).map((group) => {
      const preCount = count;
      count += group.length;
      return this.parseGroup(group, preCount);
    });
    this.result = this.postParse(items, this.opts);

    if (this.hasError) return;
    this.postCheck(this.result, this.opts);
    if (this.hasError) return;
  }

  /**
   * 在逐行解析前进行一次检查，执行后如果 this.errors 有项，则不再进行解析
   */
  protected preCheck(rows: RawCell[][], opts: Opts): void {}
  /**
   * 数据解析之后的最后校验
   */
  protected postCheck(items: object[], opts: Opts): void {}

  protected postParse(items: object[], opts: Opts): object[] {
    return items;
  }

  get hasError() {
    return this.errors.length !== 0;
  }

  protected getSheet(wb: XlsxPopulateWorkbook): XlsxPopulateWorksheet {
    return wb.sheet(0);
  }
  private getRows(sheet: XlsxPopulateWorksheet): RawCell[][] {
    const rowLength = sheet.usedRange()._maxRowNumber;

    let rows = sheet.range(Math.max(this.rowStartAt + 1, 1), 1, rowLength, this.headers.length).value();
    // 若某一行为空行，则不再解析，但要检测以确保剩余行均不为空行
    const blankRowIndex = rows.findIndex((row) => row.every(WorkbookReader.isCellEmpty))
    if (blankRowIndex !== -1) {
      if (blankRowIndex === 0) {
        throw new Error(`第 ${this.rowStartAt + 1} 行为空行，请检查`);
      }
      for (let i = blankRowIndex + 1; i < rows.length; i++) {
        if (rows[i].some(v => !WorkbookReader.isCellEmpty(v))) {
          throw new Error(`第 ${this.rowStartAt - 1 + i} 行为空行，请检查`);
        }
      }
      return rows.slice(0, blankRowIndex);
    }
    return rows;
  }
  private getGroups(rows: RawCell[][]): RawCell[][][] {
    let groups: RawCell[][][] = [];
    let curGroupsStartAt = this.rowStartAt;
    const errMsg = (msg: string, i: number) => `第 ${curGroupsStartAt + 1} ~ ${i - 1 + this.rowStartAt + 1} 行：${msg}`;
    // rows.slice(this.rowStartAt).forEach((row, i) => {
    rows.slice(0).forEach((row, i) => { // 因为在getRows中已经处理了rows = sheet.range(this.rowStartAt + 1)
      let result: RawCell[][][];
      try {
        result = this.combiner.push(row);
      } catch (e) {
        throw new Error(errMsg(e.message, i));
      }
      // 判断之前的行是否已被分组
      if (result.length > 0) {
        curGroupsStartAt = this.rowStartAt + i;
      }
    });
    try {
      this.combiner.end();
    } catch (e) {
      throw new Error(errMsg(e.message, rows.length - 1));
    }
    return this.combiner.result;
  }
  private parseGroup(group: RawCell[][], groupStartAt: number): object {
    const item = this.parseRow(group[0], false, groupStartAt);
    const multirows: object[] = [];
    group.forEach((row, i) => {
      multirows.push(this.parseRow(row, true, groupStartAt + i));
    });
    this.assignMultirowAndRemoveRowIndex(item, multirows);
    return item;
  }
  protected assignMultirowAndRemoveRowIndex(item: object, multirows: object[]): void {}
  private parseRow(richTextRow: RawCell[], multiRow: boolean, rowIndex: number): object {
    const parsed: { [field: string]: any, __rowIndex: number } = { __rowIndex: rowIndex };
    const row: LiteralCell[] = richTextRow.map(cell => (typeof cell === 'object' ? richTextCellToString(<XlsxPopulateRichTextCell>cell) : <LiteralCell>cell))
    const rowDict: Data = row
      .map((item, i) => ({ [this.headers[i] ? this.headers[i].field : '']: item }))
      .reduce((obj, cur) => Object.assign(obj, cur), {})
    this.headers.forEach((header, i) => {
      let value = row[i];

      // 判断是否忽略
      if (
        (typeof header.ignored === 'function' ? header.ignored(value, rowDict, row) : header.ignored)
        || (!multiRow && header.multirow)
        || (multiRow && !header.multirow)
      ) return;

      const pos = `${WorkbookReader.toColumnName(i + 1)}${rowIndex + 1}（${header.label}）`;
      // 检查必填项
      const required = typeof header.required === 'function'
        ? header.required(value, rowDict, row)
        : header.required;
      if (required && WorkbookReader.isCellEmpty(value)) {
        this.addError(pos, '请填写必填项');
        return;
      }
      if (header.trim !== false && typeof value === 'string') {
        value = value.replace(/(^\s*)|(\s*$)/g, '');
      }
      // 调用 validate
      if (header.validate && !WorkbookReader.isCellEmpty(value)) {
        let result;
        try {
          result = header.validate(<NotEmptyCell>value, rowDict, row);
        } catch (e) {
          result = e.message;
        }
        if (typeof result === 'string') {
          this.addError(pos, result);
          return;
        }
      }
      // 转换
      if (header.preConvert && !WorkbookReader.isCellEmpty(value)) {
        value = header.preConvert(value);
      }
      if (header.dict && !WorkbookReader.isCellEmpty(value)) {
        value = String(value);
        const dict = typeof header.dict === 'function' ? header.dict(value, rowDict, row) : header.dict;
        if (typeof header.split === 'string') {
          const failures = value.split(header.split).filter(v => !dict.hasOwnProperty(v));
          if (failures.length > 0) {
            this.addError(pos, `${failures.map(v => `「${v}」`).join('、')}不存在`);
            return;
          } else {
            parsed[header.field] = value.split(header.split).map(v => dict[v]);
            if (typeof header.join === 'string') {
              parsed[header.field] = parsed[header.field].join(header.join);
            }
          }
        } else {
          if (!dict.hasOwnProperty(value)) {
            this.addError(pos, `「${value}」不存在`);
            return;
          } else {
            parsed[header.field] = dict[value];
          }
        }
      } else if (header.convert) {
        if (WorkbookReader.isCellEmpty(value) && !header.convertIfEmpty) return;
        try {
          parsed[header.field] = header.convert(value, rowDict, row, rowIndex);
        } catch (e) {
          this.addError(pos, e.message);
          return;
        }
      } else {
        parsed[header.field] = WorkbookReader.isCellEmpty(value) ? '' : value;
      }
    });
    return parsed;
  }
  private get isSheetEmpty() {
    return this.sheet.usedRange()._maxRowNumber < (this.rowStartAt + 1);
  }

  protected addError(pos: string, message: string) {
    this.errors.push({ pos, message });
  }

  static isCellEmpty(value: RawCell): boolean {
    return typeof value === 'undefined'
      || (typeof value === 'string' && value.length === 0);
  }

  /**
   * 将列数转为对应的名。e.g.: 29 -> 'AC'
   * @param {number} num 1-based
   * @return {string}
   */
  static toColumnName(num: number): string {
    let result = '';
    for (let a = 1, b = 26; num >= a; a = b, b *= 26) {
      num -= a;
      result = String.fromCharCode(Math.floor((num % b) / a) + 65) + result;
    }
    return result;
  }
}
