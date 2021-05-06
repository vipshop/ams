import { saveAs } from '../utils/index';
import { formatDate } from '../utils/date';

interface Order {
  field: string;
  direction: 1 | -1;
}

interface Vm {
  $progress?: {
    set: (obj: { message?: string, progress: number }) => void;
    show: () => void;
    hide: () => void;
  };
  $loading: any;
  $alert: (message: string, ...args: any[]) => void;
  $message: (...args: any[]) => void;
  $confirm: (message: string) => Promise<void>;
  $options: {
    beforeDestroy: (() => void)[];
  };
  __workers: { [workerId: string]: Worker };
  on: {
    [field: string]: (...args: any) => {}
  }
}

function registerWorkerToVm($vm: Vm, worker: Worker) {
  if (!$vm.hasOwnProperty('__workers')) {
    $vm.__workers = {};
  }
  const id = Date.now();
  $vm.__workers[id] = worker;
  if (!$vm.$options.beforeDestroy) {
    $vm.$options.beforeDestroy = [];
  }
  $vm.$options.beforeDestroy.push(() => {
    if ($vm.__workers[id]) {
      $vm.__workers[id].terminate();
    };
  });
}

function alert($vm: Vm, message: string) {
  $vm.$alert(message, '', { dangerouslyUseHTMLString: true })
}

export async function exportHelper(options: {
  $vm: Vm,
  ext: string,
  Worker: any,
  workerInitData: {
    order?: Order,
    [field: string]: any,
  },

  idField: string,
  getTotal: () => Promise<number>,
  getList: (lastId: number | undefined, page: number, size: number) => Promise<{[field: string]: any}[]>,
  setLoadingOptions: (data: any) => void,

  preListFilter?: (data: any) => any,
  itemName?: string,
  sheetName?: string,
  pagesize?: number,
  eachFileRows?: number,
  exportType?: string,
  downlownTemplate?: boolean,
}): Promise<void> {

  let lastId: number | undefined;
  let page: number = 0;
  const {
    itemName = '排期',
    sheetName = '排期表',
    pagesize = 100,
    $vm, idField, getTotal, getList, setLoadingOptions, preListFilter, Worker, workerInitData, ext,
    eachFileRows = 100000,
    exportType = 'async',
    downlownTemplate = false
  } = options;

  // Safari 不支持 blob 下载
  const el = document.createElement('a')
  if (typeof el.download === 'number') {
    $vm.$message({
      message: '当前浏览器不支持导出，请使用 Chrome 浏览器',
      type: 'error'
    })
    return
  }
  // 获取总数
  let preTotal: number;
  // 下载模板
  if (!downlownTemplate) {
    setLoadingOptions({ text: '正在查询中...' })
    try {
      preTotal = await options.getTotal();
    } catch (e) {
      setLoadingOptions({ show: false })
      throw e;
    }
    if (preTotal === 0) {
      $vm.$message({
        message: `没有需要导出的${itemName}`,
        type: 'error'
      })
      throw new Error(`没有需要导出的${itemName}`);
    }
    try {
      await $vm.$confirm(`即将分${Math.ceil(preTotal / eachFileRows)}个文件，导出 ${preTotal} 条数据，是否继续？`);
    } catch (e) {
      return;
    }
    setLoadingOptions({ text: '正在导出...，当前进度10%', show: true })
  }
  const worker: Worker = new Worker();
  let workerError: boolean = false;
  function end() {
    setLoadingOptions({ show: false })
  }

  registerWorkerToVm($vm, worker);
  // 循环请求
  // let list: { [field: string]: any }[] = [];
  let total: number = 0;

  // let singleCount = 0;

  worker.postMessage({
    topic: 'init',
    data: Object.assign(workerInitData, {
      lastId,
      idField
    })
  });

  if (downlownTemplate) {
    lastId = 0; // 设置lastId则不在请求导出
    worker.postMessage({ topic: 'build' });
  } else {
    getBatchList();
  }

  if (workerError) {
    end();
    return;
  }

  worker.onmessage = e => {
    switch (e.data.topic) {
      case 'file': {
        const name = downlownTemplate ? `${sheetName}导入模板` : `${sheetName}导出_${formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss')}`
        Object.assign(window, {
          saveAsRet: saveAs(e.data.data.blobPart, name, ext)
        });
        if ((exportType === 'sync' && lastId) ||
          (exportType === 'async' && page < Math.ceil(preTotal / pagesize))) {
          worker.postMessage({
            topic: 'init',
            data: workerInitData
          });
          getBatchList();
        } else {
          end();
        }
        break;
      }
    }
  }
  worker.onerror = e => {
    workerError = true;
    setLoadingOptions({ show: false })
    alert($vm, e.message)
    console.log(e); // eslint-disable-line no-console
  } 
  async function getBatchList(): Promise<void> {
    let singleCount = 0;
    let list: { [field: string]: any }[] = [];
    while(!workerError) {
      if (exportType === 'async') page += 1;
      try {
        list = await getList(lastId, page, pagesize);
      } catch (e) {
        throw e;
      }
      if (preListFilter) {
        list = preListFilter(list);
      }
      // 结束条件1：请求结果为空
      if (list.length === 0) {
        lastId = 0; // 设置lastId为0时不再进行导出
        worker.postMessage({ topic: 'build' });
        break;
      };
      singleCount += list.length;
      total += list.length;
      lastId = list[list.length - 1][idField];
      worker.postMessage({
        topic: 'data',
        data: list
      });
      const rate = total / preTotal <= 1 ? total / preTotal : 1
      setLoadingOptions({ text: `正在导出...，当前进度${(rate * 90 + 10).toFixed(0)}%` })
      // 结束条件2：单个文件行数大于等于设置行数
      if (singleCount >= eachFileRows) {
        worker.postMessage({ topic: 'build' });
        break;
      }
      // 结束条件3：请求页码大于计算所需请求页数
      if (page >= Math.ceil(preTotal / pagesize)) {
        lastId = 0; // 设置lastId为0时不再进行导出
        worker.postMessage({ topic: 'build' });
        break;
      }
    }
  }
}

export async function importHelper(options: {
  $vm: Vm,
  Worker: any,
  workerInitData: {
    order?: Order,
    [field: string]: any,
  },
  file: any,
  eachPushRows: number,

  idField: string,
  successCode: number,
  importUrl: (data: any) => Promise<{[field: string]: any}[]>,
  setLoadingOptions: (data: any) => void,
}): Promise<void> {
  const {
    $vm, idField, successCode, importUrl, setLoadingOptions, Worker, workerInitData, file, eachPushRows
  } = options;
  const worker: Worker = new Worker();
  registerWorkerToVm($vm, worker);

  if (!$vm.__workers) $vm.__workers = {};
  $vm.__workers.importWorker = worker;
  setLoadingOptions({ text: `正在解析` })
  worker.postMessage({
    topic: 'init',
    data: Object.assign(workerInitData, {
      file,
      idField
    })
  }, [file]);

  worker.onmessage = (e: any) => {
    switch (e.data.topic) {
      case 'parseend':
        setLoadingOptions({ text: `解析完成，进度45%` })
        break;
      case 'readerror':
        alert($vm, `
          <div style="width: 100%; max-height: 500px; overflow: scroll;"><table style="border-collapse:collapse; border: none; width: 100%">
            <tr style="border-bottom: 1px solid #cacacc"><th>位置</th><th>错误信息</th></tr>
            ${e.data.data.map((obj: any) => `
            <tr style="border-bottom: 1px solid #cacacc"><td>${obj.pos}</td><td>${obj.message}</td></tr>
            `).join('')}
          </table></div>
        `)
        setLoadingOptions({ show: false })
        break;
      case 'readend':
        setLoadingOptions({ text: `正在导入，进度50%` })
        worker.terminate();
        importRequestHelper(e.data.data).then(() => {
          setLoadingOptions({ show: false })
          if ($vm.on.importSuccess && typeof $vm.on.importSuccess === 'function') {
            $vm.on.importSuccess();
          } else {
            $vm.$message({
              message: '导入成功',
              type: 'success'
            })
          }
        }).catch((e) => {
          setLoadingOptions({ show: false })
          if (e instanceof Error) {
            let err;
            try {
              err = JSON.parse(e.message);
            } catch (e) {
              err = undefined;
            }
            if (err && Array.isArray(err) && err.length) {
              alert($vm, err.map((item: any) => 
                  `<div>第 ${item.line_no} 行发生错误：</div><div style="margin: 10px 0 15px 0; padding-left: 28px;">${item.message}</div>`
                ).join(','))
            } else {
              alert($vm, e.message);
            }
          } else {
            alert($vm, e);
          }
          setLoadingOptions({ show: false })
        });
        break;
      case 'error':
        alert($vm, e.data.data);
        setLoadingOptions({ show: false })
        break;
      default:
    }
  };
  worker.onerror = (e: any) => {
    alert($vm, e.message);
    setLoadingOptions({ show: false })
  };
  async function importRequestHelper(data: any): Promise<void> {
    // 如果配置了getXlsx返回准备提交的所有数据
    if ($vm.on.getXlsxData && typeof $vm.on.getXlsxData === 'function') {
      $vm.on.getXlsxData(data)
    }
    const batches: any[] = [];
    const BATCH_SIZE = eachPushRows; // 单次100条

    let count = 0;
    const last = data.reduce((batch: any, items: any) => {
      if (count + 1 >= BATCH_SIZE) {
        batches.push(batch);
        count = 0;
        return [items];
      }
      count += 1;
      batch.push(items);
      return batch;
    }, []);
    if (last.length > 0) batches.push(last);
    return (async function sendBatches() {
      for (let i = 0; i < batches.length; i++) {
        const res: any = await importUrl(batches[i]);
        if ($vm.on.importProgress && typeof $vm.on.importProgress === 'function') {
          $vm.on.importProgress(res)
        }
        if (res.code !== successCode) {
          throw new Error(JSON.stringify(res.msg))
        } else {
          setLoadingOptions({ text: `导入中，进度${(50 + (i + 1) / batches.length * 50).toFixed(0)}%` })
        }
      }
    }());
  }
}