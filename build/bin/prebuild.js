#!/usr/bin/env node

let fs = require('fs');
let path = require('path');

let indexPath = path.resolve(__dirname, '../../src/index.js');
let indexFile = fs.readFileSync(indexPath, 'utf8');
let pkg = require('../../package.json');

fs.writeFileSync(indexPath, indexFile.replace(/ams.version = '\d+\.\d+\.\d+';/, `ams.version = '${pkg.version}';`), 'utf8');

console.log('update version success');
