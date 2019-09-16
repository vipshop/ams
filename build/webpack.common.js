const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = require('./config');

module.exports = {
    mode: 'production',
    entry: {
        ams: ['./src/index.js']
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: '[name].common.js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
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
                    name: path.posix.join('./theme-default', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./theme-default', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./theme-default', '[name].[hash:7].[ext]')
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
        // new BundleAnalyzerPlugin()
    ]
};
