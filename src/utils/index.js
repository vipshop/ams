export * from './uri';
export * from './date';
export * from './dom';
export * from './function';

export function get(object, path) {
    path = path.split('.');
    const arrRegexp = /^([\w-]+)\[(\d+)\]$/;
    for (let i = 0; i < path.length; i++) {
        if (path[i].charAt(path[i].length - 1) === ']') {
            // 数组
            const pos = arrRegexp.exec(path[i]);
            object = object[pos[1]];
            if (object) {
                object = object[pos[2]];
            }
            // 对象
        } else {
            object = object[path[i]];
        }
        // null and undefined
        if (object == null) {
            return;
        }
    }
    // console.log('object', object)
    return object;
}

export function set(object, path, value) {
    path = path.split(/\.|\[/);
    for (let i = 0; i < path.length - 1; i++) {
        if (path[i].charAt(path[i].length - 1) === ']') {
            // 数组
            object = object[path[i].slice(0, -1)];
        } else {
            // 对象
            object = object[path[i]];
        }
        // null and undefined
        if (object == null) {
            return false;
        }
    }
    if (object) {
        if (Array.isArray(object)) {
            // splice才会触发vue的更新，直接 = 更新不了
            object.splice(path.pop().replace(/\]$/, ''), 1, value);
        } else {
            object[path.pop()] = value;
        }
        return true;
    } else {
        return false;
    }
    // console.log('object', object)
}


export function getType(obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[\w+ (\w+)\]$/, '$1')
        .toLowerCase();
}

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

export function listStringHasValue(list, value) {
    return list && String(list).split(',').indexOf(value) >= 0;
}

export function listRemoveItem(list, item) {
    if (list) {
        const index = list.indexOf(item);
        if (index > -1) {
            list.splice(index, 1);
        }
    }
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

// 按照优先级取值，如果是undefined获取下一个
export function getByOrder(...args) {
    let i = 0;
    for (; i < args.length - 1; i++) {
        if (typeof args[i] !== 'undefined') {
            return args[i];
        }
    }
    return args[i];
}
