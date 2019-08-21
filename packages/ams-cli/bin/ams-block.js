#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const program = require('commander');
const { getDirName } = require('../src/config/initQuestion');
const { copyAction } = require('../src/utlis/copyAction');
const { exists } = require('../src/utlis/fileHander');
const checkWorkspace = require('../src/utlis/checkWorkspace');
const { getLatestVersion } = require('../src/utlis/getVersions');

checkWorkspace(() => {
    program
        .description('create custom ams block')
        .name('ams block')
        .usage('[name]')
        .action(async (dirName, options) => {
            let spinner;
            let answers = {};
            let isExist = false;

            if (typeof dirName === 'string') {
                const dir = path.resolve(
                    process.cwd(),
                    'packages/block-' + dirName
                );
                if (await exists(dir)) {
                    console.log(
                        chalk.yellow(
                            `The dir name ${chalk.blue(
                                'block-' + dirName
                            )} is already existed. Please change another name`
                        )
                    );
                    isExist = true;
                }
            }
            if (typeof dirName === 'object' || isExist) {
                if (!isExist) {
                    options = dirName;
                }
                answers = await inquirer.prompt([
                    getDirName(
                        '',
                        'Please specify your block name: ',
                        'packages/block-'
                    )
                ]);
                dirName = answers.dirName;
            }

            try {
                // const version = await getLatestVersion(`@ams-team/block-${dirName}`);
                // // npm上已有同名block
                // if(version){
                //     return console.log(chalk.red(`ams ERR: block block-${dirName}@${version} is already existed on npm`));
                // }
                await copyAction(dirName, 'block');
            } catch (e) {
                console.log(chalk.red(`ams ERR: ${e}`));
            }
        });
    program.parse(process.argv);
});
