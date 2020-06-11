#!/usr/bin/env node

let fs = require('fs');
let path = require('path');
// let readlineSync = require('readline-sync');
const { execSync } = require('child_process');

// 先拉远程更新
execSync('git pull');

let indexPath = path.resolve(__dirname, '../../src/index.js');
let indexFile = fs.readFileSync(indexPath, 'utf8');
let pkg = require('../../package.json');

fs.writeFileSync(indexPath, indexFile.replace(/ams.version = '\d+\.\d+\.\d+';/, `ams.version = '${pkg.version}';`), 'utf8');

// 打包 theme-vipshop
try {
    execSync('cd ./packages/theme-vipshop && npm i && npm run build && cd ../../');
} catch (error) {
    console.error('打包 theme-vipshop 失败：' + error);
}
