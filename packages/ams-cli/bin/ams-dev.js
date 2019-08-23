#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const path = require('path');
const checkWorkspace = require('../src/utlis/checkWorkspace');
const { copyFile, delFile } = require('../src/utlis/fileHander');
const webpackDevConfig = require('../build/webpack.dev');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack(webpackDevConfig);

checkWorkspace(() => {
    program
        .description('build custom fields or blocks')
        .name('ams build')
        .usage('[name]')
        .action(async (name, options) => {
            try {
                // 删除dev目录
                // dev目录文件要放在当前目录webpack才能正常工作
                // 从模板里面复制最新的dev目录
                await delFile('./dev');

                await copyFile(path.resolve(__dirname, '../template/dev'), './dev');

                // init server
                let app = new WebpackDevServer(compiler, {
                    // 注意此处publicPath必填
                    publicPath: '/'
                });

                app.listen(9527, 'localhost', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            } catch (e) {
                console.log(chalk.red(`ams ERR: ${e}`));
            }
        });

    program.parse(process.argv);
});
