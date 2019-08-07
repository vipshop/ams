// 是否外链
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/i.test(path);
}

// 解析url参数
export function parseString(str, decode = true) {
    let newstr = str.replace(/^[^\?#]*[\?#]/, '');
    let arr;
    const obj = {};
    const reg = new RegExp('(?:^|\\&)([^\\=\\&]+)(?:\\=([^\\&#]*))?', 'g');
    while ((arr = reg.exec(newstr))) {
        const key = decode ? decodeURIComponent(arr[1]) : arr[1];
        obj[key] = decode ? decodeURIComponent(arr[2] || '') : arr[2] || '';
    }
    return obj;
}

// 获取url参数
export function getQueryString(name, url = location.href) {
    url = url.replace(/^.*\?/, '');
    let reg = new RegExp(`(?:^|[?&])${name}=([^&#]*)`);
    let r = reg.exec(url);
    return (r && r[1]) || '';
}
