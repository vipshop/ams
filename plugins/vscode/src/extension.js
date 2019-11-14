// const vscode = require('vscode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function(context) {
    require('./hover')(context);
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
};