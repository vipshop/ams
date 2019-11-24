/**
 * 事件监听函数
 * @export
 * @param {object} target 监听对象
 * @param {string} eventType 事件名
 * @param {function} callback 事件监听函数
 */
export function addEvent(target, eventType, callback) {
    if (target.addEventListener) {
        target.addEventListener(eventType, callback, false);
        return {
            remove() {
                target.removeEventListener(eventType, callback, false);
            }
        };
    } else if (target.attachEvent) {
        target.attachEvent(`on${eventType}`, callback);
        return {
            remove() {
                target.detachEvent(`on${eventType}`, callback);
            }
        };
    }
    return null;
}

/**
 * 获取原生dom距离页面顶部和左边的距离
 * @export
 * @param {object} dom
 * @return {object} 距离
 */
export function getDomPos(dom) {
    let l = 0;
    let t = 0;
    while (dom.offsetParent) {
        l += dom.offsetLeft;
        t += dom.offsetTop;
        dom = dom.offsetParent;
    }
    return { left: l, top: t };
}

/**
 * getStyle 获取元素dom样式，内嵌样式 > 内部样式 > 外联样式
 * @param {*} dom
 * @param {string} sName 样式名
 * @returns
 */
export function getDomStyle(dom, sName) {
    return (dom.currentStyle || window.getComputedStyle(dom, null) || document.defaultView.getComputedStyle(dom, null))[sName];
}
