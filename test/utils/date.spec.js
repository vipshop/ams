/* eslint-disable */
import { parseTime } from '@/utils/date';

describe('utils/date.js', () => {
    it('parseTime', () => {
        // 时间格式参考：https://element.eleme.cn/#/zh-CN/component/date-picker#ri-qi-ge-shi
        const time = new Date(1557475614442); // Fri May 10 2019 16:06:54 GMT+0800 (中国标准时间)
        // 无参数返回''
        expect(parseTime()).toBe('');
        // 默认格式 'ddd MMM dd yyyy HH:mm:ss'
        expect(parseTime(time)).toBe('Fri May 10 2019 16:06:54');
        expect(parseTime(time, 'yyyy@ss')).toBe('2019@54');
        // 星期匹配
        expect(parseTime(1557475200000, 'yyyy-MM-dd HH:mm:ss ddd')).toBe('2019-05-10 16:00:00 Fri');
        expect(parseTime(1557475200000, 'yyyy-MM-dd HH:mm:ss dddd')).toBe('2019-05-10 16:00:00 Friday');
        // 转10位秒时间戳字符串
        expect(parseTime(1557475614)).toBe('Fri May 10 2019 16:06:54');
        expect(parseTime('1557475614')).toBe('Fri May 10 2019 16:06:54');
        // 转13位秒时间戳字符串
        expect(parseTime(1557475614442)).toBe('Fri May 10 2019 16:06:54');
        expect(parseTime('1557475614442')).toBe('Fri May 10 2019 16:06:54');
        // 非预期的数据返回
        expect(parseTime('a')).toBe('a');
    });
});
