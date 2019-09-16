const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pkg = require('../package.json');

const config = require('./config');

module.exports = {
    mode: 'production',
    entry: {
        'lib/ams': ['./src/index.js'],
        'lib/AMS_CONFIG': ['./src/AMS_CONFIG.js'],
    },
    output: {
        path: path.resolve(process.cwd(), './'),
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        library: 'AMS',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias
    },
    externals: {
        vue: config.vue,
        'element-ui': config.element
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./lib/theme-default', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./lib/theme-default', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./lib/theme-default', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new VueLoaderPlugin(),
        new FileManagerPlugin({
            onEnd: {
                copy: [{
                    source: path.join(
                        process.cwd(),
                        './lib/ams.js'
                    ),
                    destination: './dist/ams@' + pkg.version + '.js'
                }, {
                    source: path.join(
                        process.cwd(),
                        './lib/theme-default'
                    ),
                    destination: './dist/theme-default'
                }],
                archive: [ // 将dist文件夹打包成ams.zip并放在dist目录
                    {
                        source: './dist/',
                        destination: './dist/ams.zip'
                    }
                ]
            }
        }),
        // new BundleAnalyzerPlugin()
    ]
};
