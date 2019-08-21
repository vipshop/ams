const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const getPackages = require('../src/utlis/get-packages');
let Components = getPackages();
const config = require('./config');

const entrys = {};
let externals = {
    vue: config.vue,
    '@ams-team/ams': config.ams,
    'element-ui': config.element
};
const copyFiles = [];

const webpackConfig = pkg => {
    let comps = null;
    let exts = {
        ...externals
    };
    if (pkg) {
        comps = {
            [pkg]: Components[pkg]
        };
    } else {
        comps = { ...Components }
    }
    // 遍历需要打包的组件
    Object.keys(comps).forEach(function(name) {
        const componentPath = `packages/${name}`;
        entrys[componentPath + '/lib/' + name] = path.join(
            process.cwd(),
            componentPath,
            'src/index'
        );
        if (Components[name].externals) {
            exts = {
                ...externals,
                ...Components[name].externals
            };
        }
        copyFiles.push({
            source: path.join(
                process.cwd(),
                componentPath,
                'lib/' + name + '.js'
            ),
            destination:
                './dist/' +
                (/^field-/.test(name) ? 'fields/' : 'block/') +
                name +
                '@' +
                Components[name].version +
                '.js'
        });
    });

    return {
        mode: 'production',
        entry: entrys,
        output: {
            path: path.resolve(process.cwd(), './'),
            filename: '[name].js',
            chunkFilename: '[id].js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: config.alias
        },
        resolveLoader: {
            modules: [ path.resolve(__dirname, '../node_modules') ]
        },
        externals: exts,
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
                        limit: 30000,
                        name: path.posix.join('static', '[name].[hash:7].[ext]')
                    }
                },
                {
                    test: /\.svg(\?\S*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 30000,
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
            new ProgressBarPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new VueLoaderPlugin(),
            new FileManagerPlugin({
                onEnd: {
                    copy: copyFiles
                }
            })
            // new BundleAnalyzerPlugin()
        ]
    };
};

module.exports = webpackConfig;
