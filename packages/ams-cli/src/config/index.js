const os = require('os');
// 系统user文件夹
const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

/**
 * 文件夹定义
 * @type {Object}
 */
const dirs = {
    home,
    tmp: os.tmpdir(),
    metalsmith: 'metalsmith'
};

/**
 * 配置文件
 */

const versions = {};

const renders = {
    npmComplete: /package\.json$|index\.html$/,
    npmFull: /package\.json$|index\.html$/,
    script: /\.html$/,
    npm: /package\.json$|index\.html$/,
    field: /^README\.md$|^package\.json$|index\.js$|\.example\.js$|\.config\.js$/,
    block: /^README\.md$|^package\.json$|index\.js$|block\.vue$|\.example\.js$|\.config\.js$/
};

module.exports = { dirs, versions, renders };
