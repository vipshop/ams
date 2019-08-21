#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const program = require('commander');
const { getDirName } = require('../src/config/initQuestion');
const { copyAction } = require('../src/utlis/copyAction');
const { exists } = require('../src/utlis/fileHander');

// console.log(__dirname)
// console.log(__filename)
// console.log(path.resolve('./'))
// console.log(process.cwd())

program
    .description('create new ams project')
    .name('ams create')
    .usage('[name] [options]')
    .option('-n, --npm')
    .option('-f, --full-npm')
    .action(async (dirName, options) => {
        let spinner;
        let answers = {};
        let isExist = false;

        if (typeof dirName === 'string') {
            const dir = path.resolve(process.cwd(), dirName);
            if (await exists(dir)) {
                console.log(chalk.yellow(`The dir name ${chalk.blue(dirName)} is already existed. Please change another name`));
                isExist = true;
            }
        }
        if (typeof dirName === 'object' || isExist) {
            if (!isExist) {
                options = dirName;
            }
            answers = await inquirer.prompt([
                getDirName(
                    'amsProject',
                    'Please specify your project dir name: '
                )
            ]);
            dirName = answers.dirName;
        }

        try {
            if (!options.npm && !options.fullNpm) {
                answers = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'type',
                        message: 'please choice a project type',
                        choices: [
                            {
                                name: `use npm with (${chalk.magenta(
                                    'webpack'
                                )}) simple`,
                                value: 'npm'
                            },
                            {
                                name: `use npm with (${chalk.magenta(
                                    'webpack'
                                )} and ${chalk.magenta(
                                    'router'
                                )}) full`,
                                value: 'npmFull'
                            }
                        ]
                    }
                ]);
                // console.log(answers)
            }
            // console.log(options)
            let dirType = '';
            if (options.npm || answers.type === 'npm') {
                dirType = 'npm';
            } else {
                dirType = 'npmFull';
            }

            await copyAction(dirName, dirType);

            console.log(
                chalk.white('please run'),
                chalk.blue(`cd ${dirName}`),
                chalk.white('to continue')
            );
        } catch (e) {
            console.log(chalk.red(`ams ERR: ${e}`));
        }
    });

program.parse(process.argv);
