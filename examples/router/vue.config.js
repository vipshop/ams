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
        // 开启分离js
        config.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `npm.${packageName.replace('@', '')}`;
                        }
                    }
                }
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
    // runtimeCompiler: true
};