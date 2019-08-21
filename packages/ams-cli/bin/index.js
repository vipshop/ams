#!/usr/bin/env node
const { getLatestVersion } = require('../src/utlis/getVersions');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { versionCompare } = require('../src/utlis');

getLatestVersion('@ams-team/cli').then(async latestVersion => {
    const currentVersion = require('../package').version;
    if(versionCompare(currentVersion, latestVersion) < 0) {
        console.log(`${chalk.red('there is a new version ' + latestVersion + ' please run ')}${chalk.blue('npm i -g @ams-team/cli')}${chalk.red(' to update')}\n`);
        answers = await inquirer.prompt([{
            type: 'confirm',
            name: 'yes',
            message: 'continue use this version ?'
        }]);
        if (!answers.yes) {
            return
        }
    }

    require('commander')
    .version(currentVersion)
    .usage('<command> [options]')
    .command('create [respo] [options]', 'generate a new ams project from a template')
    .command('field [name]', 'create a new custom ams field')
    .command('block [name]', 'create a new custom ams block')
    .command('build [name]', 'build custom packages')
    .command('publish [name]', 'publish custom packages')
    .command('dev', 'run custom dev server')
    .parse(process.argv);
}).catch(e=>{
    console.log(chalk.red(`ams ERR: ${e}`))
})
