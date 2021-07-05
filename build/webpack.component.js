const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const vueLoaderConfig = require('./vue-loader.conf');
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getPackages = require('./get-packages');
let Components = getPackages();
const config = require('./config');

const entrys = {};
let externals = {
    vue: config.vue,
    '@ams-team/ams': config.ams,
    'element-ui': config.element
};
const moveFiles = [];

// 打包类型
let libraryTarget = process.argv && process.argv[5] || 'commonjs2';

const webpackConfig = env => {
    // 如果通过 npm run components -- --env.pkg=field-editor 传入会获取到 pkg，打包单一模块
    if (env) {
        if (env.pkg) {
            Components = {
                [env.pkg]: Components[env.pkg]
            };
        }
    }
    // 遍历需要打包的组件
    Object.keys(Components).forEach(function(name) {
        const componentPath = `packages/${name}`;
        entrys[componentPath + '/lib/' + name] = path.join(
            process.cwd(),
            componentPath,
            'src/index'
        );
        if (name === 'block-chart') {
            entrys[componentPath + '/lib/theme/vipshop'] = path.join(
                process.cwd(),
                componentPath,
                'src/theme/vipshop'
            );
            // npm run components-umd -- --env.pkg=field-editor
            if (libraryTarget === 'umd') {
                moveFiles.push({
                    source: path.join(
                        process.cwd(),
                        componentPath,
                        'lib/theme/vipshop.umd.js'
                    ),
                    destination:
                        './dist/' +
                        (/^field-/.test(name) ? 'fields/' : 'block/') +
                        name +
                        '-theme-vipshop@' +
                        Components[name].version +
                        '.js'
                });
            }
        }
        if (Components[name].externals) {
            externals = {
                ...externals,
                ...Components[name].externals
            };
        }
        // 不想发布的包将publish置为false
        if (Components[name].publish !== false && libraryTarget === 'umd') {
            moveFiles.push({
                source: path.join(
                    process.cwd(),
                    componentPath,
                    'lib/' + name + '.umd.js' // 只拷贝打包为umd的类型
                ),
                destination:
                    './dist/' +
                    (/^field-/.test(name) ? 'fields/' : 'block/') +
                    name +
                    '@' +
                    Components[name].version +
                    '.js'
            });
        }
    });

    return {
        mode: 'production',
        entry: entrys,
        output: {
            path: path.resolve(process.cwd(), './'),
            filename: libraryTarget === 'umd' ? '[name].umd.js' : '[name].js',
            chunkFilename: '[id].js',
            libraryTarget,
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: config.alias
        },
        externals: externals,
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
                    mkdir: [
                        './dist/block',
                        './dist/fields',
                    ],
                    move: moveFiles
                }
            })
            // new BundleAnalyzerPlugin()
        ]
    };
};

module.exports = webpackConfig;
