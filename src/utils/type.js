export function isUndefined(val) {
    return typeof val === 'undefined';
}

export function isDefined(val) {
    return !isUndefined(val);
}

export function getType(obj) {
    return Object.prototype.toString
        .call(obj)
        .replace(/^\[\w+ (\w+)\]$/, '$1')
        .toLowerCase();
}