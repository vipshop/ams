const vscode = require('vscode');

/**
 * 鼠标悬停提示，判断为AMS对应的类型加上文档提示
 * @param {*} document
 * @param {*} position
 */
function provideHover(document, position) {
    const fileName    = document.fileName;
    const line        = document.lineAt(position);

    if (/\.js$/.test(fileName)) {
        const type = line.text.match(/(?:\s{0,}type:\s+)(\'|\")(.*)(\'|\")/);
        if (new RegExp(/ams\.resource*./, 'gm').test(line.text)) {
            return new vscode.Hover(`* **参考：** [AMS-资源](https://vipshop.github.io/ams/api/resource.html)`);
        } else if (new RegExp(/ams\.block*./, 'gm').test(line.text)) {
            return new vscode.Hover(`* **参考：** [AMS-区块](https://vipshop.github.io/ams/block)`);
        } else if (type && type[2]) {
            const name = type[2];
            const fields = [
                'text', 'password', 'textarea', 'switch', 'color', 'rate', 'unitselect', 'link', 'button',
                'date', 'time', 'timepicker', 'timerange', 'datetime', 'datetimerange',
                'radio', 'checkbox', 'select', 'cascader', 'transfer',
                'image', 'audio', 'video', 'file', 'originfile',
                'slider', 'progress', 'inputnumber',
                'array', 'object', 'union'
            ];
            const blocks = [
                'grid', 'list', 'imagelist', 'table', 'dialog', 'error', 'router', 'collapse', 'component',
                'title', 'tabs', 'steps', 'card', 'dropdown'
            ];
            if (fields.indexOf(name) >= 0) {
                return new vscode.Hover(`* **参考：** [AMS字段-${name}](https://vipshop.github.io/ams/field/${name}.html)`);
            } else if (blocks.indexOf(name) >= 0) {
                return new vscode.Hover(`* **参考：** [AMS区块-${name}](https://vipshop.github.io/ams/block/${name}.html)`);
            }
        }
    }
}

module.exports = function(context) {
    // 注册鼠标悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider('javascript', {
        provideHover
    }));
};