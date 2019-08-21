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
const webpackBuildConfig = require('../build/webpack.component');
const webpack = require('webpack');


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
        .description('publish custom fields or blocks to npm')
        .name('ams publish')
        .usage('[name]')
        .action(async (name, options) => {
            let spinner;

            try {
                let components = require('../src/utlis/get-packages')();
                let pkgName = '';
                if(typeof name === 'string'){
                    if(components[name]){
                        pkgName = name;
                        components = {[name]: components[name]};
                        console.log(`publishing ${name}`)
                    } else if(components[`block-${name}`]){
                        pkgName = `block-${name}`;
                        components = {[`block-${name}`]: components[`block-${name}`]};
                        console.log(`publishing block-${name}`)
                    } else if(components[`field-${name}`]){
                        pkgName = `field-${name}`;
                        components = {[`field-${name}`]: components[`field-${name}`]};
                        console.log(`publishing field-${name}`)
                    }
                }
                spinner = ora(`start publishing`).start();

                // // 依此打包
                for(let key in components){
                    if(components.hasOwnProperty(key)){
                        const componet = components[key];
                        const pkgPath = path.join(process.cwd(), `packages/${key}/package.json`);
                        const pkg = require(pkgPath);
                        const componetVersion = `${key}@${componet.version}`;

                        // console.log(pkg, componetVersion);

                        await execAsync(`cd packages/${key} && npm publish`);

                        spinner.succeed(`publish ${componetVersion} succeed`);
                    }
                }
            } catch (e) {
                spinner && spinner.fail('publish fail')
                console.log(chalk.red(`ams ERR: ${e}`));
            }
        });

    program.parse(process.argv);
});
