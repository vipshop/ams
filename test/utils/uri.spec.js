/* eslint-disable */
import { isExternal, parseString, getQueryString } from '@/utils/uri';

describe('utils/uri.js', () => {
    it('isExternal', () => {
        expect(isExternal('https://www.baidu.com')).toBe(true);
        expect(isExternal('mailto://www.baidu.com')).toBe(true);
        expect(isExternal('tel://www.baidu.com')).toBe(true);
        expect(isExternal('./a/b')).toBe(false);
    });
    it('parseString', () => {
        expect(parseString('https://a.vip.com?a=1&b=2')).toEqual({
            a: '1',
            b: '2'
        });
        // 后面的值会覆盖前面的值
        expect(parseString('?a=1&b=2&a=3')).toEqual({
            a: '3',
            b: '2'
        });
        // hash值、无value的key
        expect(parseString('#a')).toEqual({ a: '' });
        // 默认decode
        expect(parseString('#%26=%26')).toEqual({ '&': '&' });
        // decode参数为false时不decode
        expect(parseString('#%26=%26', false)).toEqual({ '%26': '%26' });
        // decode 为false且value为空
        expect(parseString('#%26=', false)).toEqual({ '%26': '' });
        expect(parseString('/pages/index?a=apple&b=banana')).toEqual({
            a: 'apple',
            b: 'banana'
        });
        expect(
            parseString('/pages/index?a=apple&b=banana&b=black')
        ).toEqual({
            a: 'apple',
            b: 'black'
        });
    });
    it('getQueryString', () => {
        expect(getQueryString('name', 'https://a.vip.com?name=edward')).toBe('edward');
        expect(getQueryString('name', 'pages/index/index?name=edward')).toBe('edward');
        expect(getQueryString('age', 'pages/index/index?name=edward')).toBe('');
        expect(getQueryString('a', 'a=1')).toBe('1');
        expect(getQueryString('b', 'a=1&b=2')).toBe('2');
        expect(getQueryString('a', 'a')).toBe('');
        // location.href配置在jest.config.js的testURL中
        expect(getQueryString('name')).toBe('edward');
    });
});
