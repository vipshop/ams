import {
    get, set, view, equals, getFile, setFile, viewFile, getArray, setArray,
    getterArray, setterArray, viewerArray,
    getSelect, setSelect,
    getDate, setDate,
    viewDate, viewPassword,
    getUnits, setUnits, viewUnits
} from '@/ams/configs/field-get-set';

describe('configs/field-get-set.js', () => {
    it('get', () => {
        expect(get()).toBeUndefined();
        expect(get('a')).toBeDefined();
    });
    it('set', () => {
        expect(set()).toBeUndefined();
        expect(set('a')).toBeDefined();
    });
    it('view', () => {
        expect(view()).toBeUndefined();
        expect(view('a')).toBeDefined();
    });
    it('equals', () => {
        expect(equals('', null, { emptyEquel: true })).toBe(true);
        expect(equals('', undefined, { emptyEquel: true })).toBe(true);
        expect(equals('', undefined)).toBe(false);
        expect(equals('a', 'a')).toBe(true);
        expect(equals('a', 'b')).toBe(false);
        expect(equals({}, null, { emptyEquel: true })).toBe(false);
        expect(equals({ a: 1 }, { a: 1, b: 2})).toBe(false);
        expect(equals({ a: 1 }, { a: 1 })).toBe(true);
        expect(equals({ a: { b: 1 }}, { a: { b: 2 }})).toBe(false);
        expect(equals(() => 'a', () => 'b')).toBe(false);
        expect(equals(() => 'a', () => 'a')).toBe(true);
    });
    it('getFile', () => {
        const imgUrl = 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png';
        // 需要为数组格式，如果url有值，则需要有name和url两个参数
        expect(getFile()).toHaveLength(0);
        expect(getFile()).toEqual([]);
        expect(getFile(imgUrl)).toHaveLength(1);
    });
    it('setFile', () => {
        const fileArr = [{ url: 'a' }, { url: 'b' }];
        expect(setFile()).toBe('');
        expect(setFile(fileArr)).toBe('a,b');
    });
    it('viewFile', () => {
        const imgUrl = 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png';
        expect(viewFile()).toBe('');
        expect(viewFile(imgUrl)).toBe('1541579376290922128.png');
    });
    it('getArray', () => {
        expect(getArray()).toEqual([]);
        expect(getArray(null)).toEqual([]);
        expect(getArray('')).toEqual([]);
        expect(getArray('1,2')).toEqual(['1', '2']);
    });
    it('setArray', () => {
        expect(setArray([1, 2])).toEqual('1,2');
        expect(setArray([])).toEqual('');
    });
    it('getterArray', () => {
        const getter = jest.fn((item, field) => `${field}:${item}`);
        expect(getterArray(getter)('1,2', 'field')).toEqual(['field:1', 'field:2']);
        expect(getterArray(getter)('', 'field')).toBeUndefined();
        expect(getterArray(getter)(null, '')).toBeUndefined();
    });
    it('setterArray', () => {
        const setter = jest.fn((item, field) => `${field}:${item}`);
        expect(setterArray(setter)(['1', '2'], 'field')).toEqual('field:1,field:2');
        expect(setterArray(setter)('', 'field')).toBe('');
        expect(setterArray(setter)(null, '')).toBe('');
    });
    it('viewerArray', () => {
        const viewer = jest.fn((item, field) => viewDate(item, { format: 'yyyy-MM-dd HH:mm:ss' }));
        expect(viewerArray(viewer)('1540137600000,1541606400000', { props: { type: 'datetimerange' }})).toEqual('2018-10-22 00:00:00 至 2018-11-08 00:00:00');
        expect(viewer.mock.calls.length).toBe(2);
        expect(viewer.mock.calls[0][0]).toBe('1540137600000');
        expect(viewer.mock.calls[1][0]).toBe('1541606400000');
        expect(viewerArray(viewer)('1540137600000,1541606400000', { props: { type: 'dates' }})).toEqual('2018-10-22 00:00:00, 2018-11-08 00:00:00');
    });
    it('getSelect', () => {
        const getField = (isMultiple) => ({
            props: {
                multiple: Boolean(isMultiple)
            }
        });
        expect(getSelect('1,2', getField(true))).toEqual(['1', '2']);
        expect(getSelect(1, getField(false))).toBe(1);
        expect(getSelect(1, getField(false))).not.toBe('1');
    });
    it('setSelect', () => {
        const getField = (isMultiple) => ({
            props: {
                multiple: Boolean(isMultiple)
            }
        });
        expect(setSelect([1, 2], getField(true))).toBe('1,2');
        expect(setSelect(1, getField(false))).toBe(1);
        expect(setSelect(1, getField(false))).not.toBe('1');
    });
    it('getDate', () => {
        expect(getDate('1546272000000')).toBe(1546272000000);
        expect(getDate('a')).toBe('a');
    });
    it('setDate', () => {
        const date = new Date('2019/01/01 00:00:00');
        expect(setDate(date)).toBe(1546272000000);
        expect(setDate('a')).toBe('a');
    });
    it('viewDate', () => {
        const getField = (type) => ({
            props: {
                type
            }
        });
        expect(viewDate(1551290400000, getField('year'))).toBe('2019');
        expect(viewDate('1551290400000', getField('year'))).toBe('2019');
        expect(viewDate('1551290400000', getField('month'))).toBe('2019-02');
        expect(viewDate('1551290400000', getField('datetimerange'))).toBe('2019-02-28 02:00:00');
        expect(viewDate('1551290400000', getField('datetime'))).toBe('2019-02-28 02:00:00');
        expect(viewDate('1551290400000', getField('timepicker'))).toBe('02:00:00');
        expect(viewDate('1551290400000', getField(''))).toBe('2019-02-28');

        expect(viewDate(1551290400000, getField('month'))).toBeDefined();
        expect(viewDate(1551290400000, { format: 'yyyy-MM' })).toBe('2019-02');
    });
    it('viewPassword', () => {
        expect(viewPassword('123456')).toBe('******');
        expect(viewPassword('123456')).not.toBe('123456');
    });
    it('getUnits', () => {
        expect(getUnits('1000000', { defaultUnit: '万', units: '万,亿' })).toEqual({ 'unit': '万', 'val': '1000000' });
        expect(getUnits('222毫米', { defaultUnit: '毫米', units: ['毫米', '厘米', '分米', '千米'] })).toEqual({ 'unit': '毫米', 'val': '222' });
    });
    it('setUnits', () => {
        const val = { val: 1000, unit: '万' };
        expect(setUnits(val)).toBe('1000万');
    });
    it('viewUnits', () => {
        expect(viewUnits('a')).toBeDefined();
    });
});