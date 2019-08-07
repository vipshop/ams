/* eslint-disable */
import {get, set, getType, serialize, listStringHasValue, listRemoveItem, deepExtend, getByOrder} from '@/utils/index';

describe('utils/index.js', () => {
    it('get', () => {
        const data = {
            a: {
                b: [1,2,3]
            },
            c: 4,
            d: {
                e: {
                    f: 5
                }
            },
            g: ''
        };
        expect(get(data, 'a.b[1]')).toBe(2);
        expect(get(data, 'a')).toEqual(data.a);
        expect(get(data, 'c')).toBe(4);
        expect(get(data, 'd.e.f')).toBe(5);
        expect(get(data, 'a.e.f')).toBe(undefined);
        expect(get(data, 'g[5]')).toBe('');
    });
});

describe('utils/index.js', () => {
    it('set', () => {
        const data = {
            a: {
                b: [1,2,3]
            },
            c: 4,
            d: {
                e: {
                    f: 5
                }
            },
            t: 0,
            p: [
                {a: ''}
            ]
        };
        expect(set(data, 'g',12)).toBe(true);
        expect(set(data, 'a.b[1]',13)).toBe(true);
        expect(set(data, 'd.e.f',14)).toBe(true);
        expect(set(data, 'd.e.h',15)).toBe(true);
        expect(set(data, 'p[0].a', 15)).toBe(true);
        expect(data).toEqual({
            a: {
                b: [1,13,3]
            },
            c: 4,
            d: {
                e: {
                    f: 14,
                    h: 15
                }
            },
            g: 12,
            t: 0,
            p: [
                {a: 15}
            ]
        })
        expect(set(data, 'g.d.e.f')).toBe(false);
        expect(set(data, 't.a')).toBe(false);
    });
});

describe('utils/index.js', () => {
    it('getType', () => {
        expect(getType(1)).toBe('number');
        expect(getType(()=>{})).toBe('function');
        expect(getType(/a/)).toBe('regexp');
        expect(getType([])).toBe('array');
    });
});

describe('utils/index.js', () => {
    it('serialize', () => {
        let params = [];
        params.add = function(key, value) {
            if (value == null) value = '';
            this.push(escape(key) + '=' + escape(value));
        };

        serialize(params, {a:1, b:2})
        expect(params).toContain('a=1');
        serialize(params, {c:[1]}, '&')
        expect(params).toContain('%26%5Bc%5D%5B%5D=1');
        serialize(params, [1])
        expect(params).toContain('undefined=');
    });
});

describe('utils/index.js', () => {
    it('listStringHasValue', () => {
        expect(!!listStringHasValue()).toBe(false);
        expect(listStringHasValue('1,2,3','1')).toBe(true);
        expect(listStringHasValue('1,2,3','3')).toBe(true);
        expect(listStringHasValue('1,2,3','4')).toBe(false);
    });
});

describe('utils/index.js', () => {
    it('listRemoveItem', () => {
        const data = [1,2,'3',4,'1'];
        listRemoveItem(data, 1);
        listRemoveItem(data, '3');
        listRemoveItem(data, 5);
        expect(data).toEqual([2,4,'1']);

        // 非数组
        const dataNull = null
        listRemoveItem(dataNull, 1);
        expect(dataNull).toBeNull();
    });
});

describe('utils/index.js', () => {
    it('deepExtend', () => {
        // 对象
        const data1 = {};
        deepExtend(data1, {a:{b:{c:{d:1},e:[1]}}});
        expect(data1).toEqual({a:{b:{c:{d:1},e:[1]}}});
        // 数组
        const data2 = [1];
        deepExtend(data2, [1,2]);
        expect(data2).toEqual([1,2]);
        deepExtend(data2, [3]);
        expect(data2).toEqual([3,2]);
        // 不匹配的类型
        const data3 = {a:1,b:[]};
        deepExtend(data3, {a:{b:2},b:{c:2}});
        expect(data3).toEqual({a:{b:2},b:{c:2}});
        // 对象嵌套对象
        const data4 = {a:{b:{c:1}}};
        deepExtend(data4, {a:{b:{c:{d:1}}}});
        expect(data4).toEqual({a:{b:{c:{d:1}}}});
        // 对象嵌套数组
        const data5 = {a:[{b:1}]};
        deepExtend(data5, {a:[{b:2}]});
        expect(data5).toEqual({a:[{b:2}]});
        // source为非对象和数组
        const data6 = {a: 1};
        deepExtend(data6, '{a:2}');
        expect(data6).toEqual({a: 1});

        // in遍历对象所有属性，包含实例及原型的属性
        // hasOwnProperty判断对象实例是否包含的属性
        let data7 = {};
        let P = class {};
        Object.assign(P.prototype, { name: 'edward' })
        let p = new P();
        deepExtend(data7, p);
        expect(data7).toEqual({});
    });
});

describe('utils/index.js', () => {
    it('getByOrder', () => {
        expect(getByOrder(1,2,3)).toBe(1);
        expect(getByOrder(undefined,2,3)).toBe(2);
        expect(getByOrder(undefined,null,3)).toBe(null);
        expect(getByOrder(undefined,false,3)).toBe(false);
        expect(getByOrder(undefined,undefined,3)).toBe(3);
    });
});


