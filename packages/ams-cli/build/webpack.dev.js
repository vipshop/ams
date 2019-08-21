const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const config = require('./config');

module.exports = {
    mode: 'development',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:9527',
            './dev/app.js'
        ]
    },
    devtool: "cheap-module-eval-source-map",
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [ 'node_modules', path.resolve(__dirname, '../node_modules') ]
    },
    resolveLoader: {
        modules: [ path.resolve(__dirname, '../node_modules') ]
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
                loaders: ['style-loader', 'css-loader']
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
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://localhost:9527`
                ]
            }
        })
        // new BundleAnalyzerPlugin()
    ]
};
