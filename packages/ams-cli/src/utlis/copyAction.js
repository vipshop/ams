const Metalsmith = require('metalsmith');
const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');
const util = require('util');
const { exec, execSync } = require('child_process');
const path = require('path');
const execAsync = util.promisify(exec);
const { initQuestion, initMetadata } = require('../config/initQuestion');
const { copyFile, delFile } = require('./fileHander');
const consolidate = require('consolidate');
const { dirs } = require('../config/index');
const { mkdirp } = require('./fileHander');
const renderContent = consolidate.ejs.render;
const { getLatestVersion } = require('./getVersions');


// template为传入的dirName，模板名称
async function metalsmithAction(dirName, dirType, meta) {
    const base = `${dirs.tmp}/${dirName}`;
    const metalsmith = Metalsmith(base);
    const tmpBuildDir = `${base}/${dirs.metalsmith}`;

    await mkdirp(tmpBuildDir);

    return new Promise((resolve, reject) => {
        metalsmith
            .metadata(meta)
            .source('./template')
            .destination(tmpBuildDir)
            .clean(false)
            .use(render())
            .build(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
    });
}

function render() {
    return function _render(files, metalsmith, next) {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach(async function(file) {
            if (meta.render && meta.render.test(file)) {
                const str = files[file].contents.toString();
                await renderContent(str, meta, (err, res) => {
                    if (err) {
                        return next(err);
                    }
                    files[file].contents = Buffer.from(res);
                });
            }
        });
        next();
    };
}

async function copyAction(dirName, dirType, meta = {}) {
    // 临时工作文件夹
    const tmp = `${dirs.tmp}/${dirName}`;
    let spinner;
    // 复制一份到临时目录，在临时目录编译生成

    try {
        const answers = await inquirer.prompt(initQuestion(dirName, dirType));

        meta = {
            ...answers,
            ...initMetadata(dirName, dirType),
            ...meta,
            amsVersion: await getLatestVersion('@ams-team/ams')
        };

        spinner = ora(`copy file to tmp dir`).start();
        await copyFile(
            path.join(__dirname, '../../template', dirType),
            `${tmp}/template`
        );
        spinner.succeed('copy file to tmp dir success');
        await metalsmithAction(dirName, dirType, meta);
        spinner.succeed('compile success');

        let distDir = `./${dirName}`;
        // field 和 block 放到packages目录，更新components.json
        if(dirType === 'field' || dirType === 'block'){
            distDir = `./packages/${dirType}-${dirName}`;
            // const confPath = path.join(process.cwd(), './components.json');
            // const components = require(confPath);
            // components[`${dirType}-${dirName}`] = {
            //     version: meta.version
            // }
            // fs.writeFileSync(confPath, JSON.stringify(components, null, 4));
        }

        await copyFile(
            `${dirs.tmp}/${dirName}/${dirs.metalsmith}`,
            distDir
        );

        if (meta.npm) {
            spinner = ora(`installing package`).start();
            await execAsync(`npm install --prefix ./${dirName}`);
            spinner.succeed('install success');
        }
    } catch (e) {
        // 继续抛出错误让外层处理
        throw e;
    } finally {
        // 清除临时文件夹
        await delFile(tmp);
        spinner.succeed('clean success');
    }
}

exports.copyAction = copyAction;
