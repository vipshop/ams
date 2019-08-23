#!/usr/bin/env node
const ora = require('ora');
const chalk = require('chalk');
const program = require('commander');
const { exec } = require('child_process');
// const path = require('path');
const util = require('util');
const execAsync = util.promisify(exec);
const checkWorkspace = require('../src/utlis/checkWorkspace');

checkWorkspace(() => {
    program
        .description('publish custom fields or blocks to npm')
        .name('ams publish')
        .usage('[name]')
        .action(async (name) => {
            let spinner;

            try {
                let components = require('../src/utlis/get-packages')();
                if (typeof name === 'string') {
                    if (components[name]) {
                        components = { [name]: components[name] };
                        console.log(`publishing ${name}`);
                    } else if (components[`block-${name}`]) {
                        components = { [`block-${name}`]: components[`block-${name}`] };
                        console.log(`publishing block-${name}`);
                    } else if (components[`field-${name}`]) {
                        components = { [`field-${name}`]: components[`field-${name}`] };
                        console.log(`publishing field-${name}`);
                    }
                }
                spinner = ora(`start publishing`).start();

                // // 依此打包
                for (let key in components) {
                    if (components.hasOwnProperty(key)) {
                        const componet = components[key];
                        const componetVersion = `${key}@${componet.version}`;

                        await execAsync(`cd packages/${key} && npm publish`);

                        spinner.succeed(`publish ${componetVersion} succeed`);
                    }
                }
            } catch (e) {
                spinner && spinner.fail('publish fail');
                console.log(chalk.red(`ams ERR: ${e}`));
            }
        });

    program.parse(process.argv);
});
