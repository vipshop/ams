/* eslint-disable */
import { debounce } from '@/utils/function';

describe('utils/function.js', () => {
    it('debounce', (done) => {
        let count = 0;
        let target = {};
        // 默认delay，为100
        const fn = debounce(function(arg){
            // 传入参数
            expect(arg).toBe(1);
            expect(this).toBe(target);
            count++
        });
        fn();
        fn();
        fn.call(target, 1);
        setTimeout(() => {
            expect(count).toBe(1);
            done();
        }, 200);
    });
});
debounce
