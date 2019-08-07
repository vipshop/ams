
/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay = 100) {
    let timer = null;
    return function () {
        let self = this;
        let args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(self, args);
        }, delay);
    };
}
