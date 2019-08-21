#!/usr/bin/env node

const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const program = require('commander');
const { exec, execSync } = require('child_process');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(exec);
const checkWorkspace = require('../src/utlis/checkWorkspace');
const { getLatestVersion } = require('../src/utlis/getVersions');
const { versionCompare } = require('../src/utlis');
const { copyFile, delFile } = require('../src/utlis/fileHander');
const webpackDevConfig = require('../build/webpack.dev');
const webpack = require('webpack');
const webpackDevServer = require("webpack-dev-server");

const compiler = webpack(webpackDevConfig);


async function build(conf){
    return new Promise((resolve, reject) => {
        webpack(conf, (err, stats) => {
            if (err || stats.hasErrors()) {
                console.error(err || stats);
              // 在这里处理错误
              return reject(err);
            }
            // 处理完成
            resolve();
          });
    });
}

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

                //init server
                var app = new webpackDevServer(compiler, {
                    //注意此处publicPath必填
                    publicPath: '/'
                });

                app.listen(9527, "localhost", function (err) {
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
