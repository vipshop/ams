const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function checkWorkspace(success) {
    const pkgPath = path.join(process.cwd(), './packages');

    if (fs.existsSync(pkgPath) && fs.statSync(pkgPath).isDirectory()) {
        return success();
    }
    console.log(
        `${chalk.red('ams ERR: you are not in a folder with ')}${chalk.green(
            'packages'
        )}${chalk.red(' folder')}`
    );
};
