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
                '@ams-team/ams': resolve('../../src/')
            }
        };
    },
    publicPath: '/ams/example/',
    outputDir: '../../docs/dist/example',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        disableHostCheck: true
    }
};