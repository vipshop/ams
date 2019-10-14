const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    configureWebpack: config => {
        config.resolve = {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
                'vue': resolve('node_modules/vue'),
                '@ams-team/ams': resolve('../../')
            }
        };
    },
};