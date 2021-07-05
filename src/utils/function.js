import { isDefined, getType } from './type';

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


/**
* Calls the given callback on every Element of an Object. Uses hasOwnProperty.
*/
export function loopObj(object, callback) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key]);
        }
    }
}


/**
 * Check whether the object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}


// ------------- 排序相关 -------------------

// TODO 这里是否可以采用 lodash.sortBy 进行替换？
function SortByProps(item1, item2) {
    const props = [];
    for (let i = 2; i < arguments.length; i++) {
        props[i - 2] = arguments[i];
    }
    let cps = [];
    // 存储排序属性比较结果
    // 如果未指定排序属性，则按照全属性升序排序
    let asc = true;
    if (props.length < 1) {
        for (const p in item1) {
            if (item1[p] > item2[p]) {
                cps.push(1);
                break;
            } else if (item1[p] === item2[p]) {
                cps.push(0);
            } else {
                cps.push(-1);
                break;
            }
        }
    } else {
        for (let i = 0; i < props.length; i++) {
            const prop = props[i];
            for (const o in prop) {
                if (hasOwn(prop, o)) {
                    asc = Boolean(prop[o] === 'ascending');
                    if (item1[o] > item2[o]) {
                        cps.push(asc ? 1 : -1);
                        break;
                    } else if (item1[o] === item2[o]) {
                        cps.push(0);
                    } else {
                        cps.push(asc ? -1 : 1);
                        break;
                    }
                }
            }
        }
    }

    for (let j = 0; j < cps.length; j++) {
        if (cps[j] === 1 || cps[j] === -1) {
            return cps[j];
        }
    }
    return 0;
}

// TODO 采用 lodash 替换
export function sortBy(source, propOrders) {
    if (Array.isArray(source) && source.length) {
        return source.sort((a, b) => SortByProps(a, b, propOrders));
    }
    return [];
}

// 按照优先级取值，如果是undefined获取下一个
export function getByOrder(...args) {
    // 注释为原来的实现方案
    // let i = 0;
    // for (; i < args.length - 1; i++) {
    //     if (typeof args[i] !== 'undefined') {
    //         return args[i];
    //     }
    // }
    // return args[i];
    const item = args.find(isDefined);
    return item ? item : args[args.length - 1];
}

/**
 * 序列化
 * @param {*} params
 * @param {*} obj
 * @param {*} scope
 */
export function serialize(params, obj, scope) {
    let type;
    let array = Array.isArray(obj);
    let hash = getType(obj) === 'object';

    Object.keys(obj).forEach(function(key) {
        let value = obj[key];
        type = getType(value);
        if (scope) { key =
                scope +
                '[' +
                (hash || type === 'object' || type === 'array' ? key : '') +
                ']'; }
        // handle data in serializeArray() format
        if (!scope && array) { params.add(value.name, value.value) }
        // recurse into nested objects
        else if (type === 'array' || type === 'object') { serialize(params, value, key) }
        else { params.add(key, value) }
    });
}


// 深度合并对象
export function deepExtend(destination, source) {
    const type = getType(source);
    if (type === 'object' || type === 'array') {
        for (let property in source) {
            if (source.hasOwnProperty(property)) {
                let old = destination[property];
                let obj = source[property];
                let oldType = getType(old);
                let objType = getType(obj);
                if (objType === 'object') {
                    const target = oldType === 'object' ? old : {};
                    destination[property] = deepExtend(target, obj);
                } else if (objType === 'array') {
                    const target = oldType === 'array' ? old : [];
                    destination[property] = deepExtend(target, obj);
                } else {
                    destination[property] = source[property];
                }
            }
        }
    }
    return destination;
}