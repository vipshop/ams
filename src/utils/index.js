export * from './uri';
export * from './date';
export * from './dom';
export * from './function';
export * from './tools';
export * from './localstorage';
export * from './type';
export * from './loader';
export * from './list';

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
