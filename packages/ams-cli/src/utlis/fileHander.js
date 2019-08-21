const fs = require('fs');
const ncp = require('ncp');
const _mkdirp = require('mkdirp');
const rimraf = require('rimraf');
// const unlink = util.promisify(fs.unlink);

function copyFile(src, dest) {
    return new Promise(async (resolve, reject) => {
        await mkdirp(dest);
        // await mkdirp(src);
        ncp(src, dest, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function copySingleFile(source, to) {
    return new Promise(resolve => {
        let read = fs.createReadStream(source);
        read.on('error', err => {
            throw err;
        });

        let write = fs.createWriteStream(to);
        write.on('error', err => {
            throw err;
        });
        write.on('finish', () => {
            resolve();
        });

        read.pipe(write);
    });
}

function exists(dist) {
    try {
        fs.statSync(dist);
    } catch (err) {
        return false;
    }
    return true;
}

function mkdirp(dist) {
    return new Promise((resolve) => {
        _mkdirp(dist, err => {
            if (err) {
                resolve();
            }
            resolve(dist);
        });
    });
}

function delFile(dist) {
    return new Promise((resolve, reject) => {
        rimraf(dist, err => {
            if (err) reject(err);
            resolve(dist);
        });
    });
}

module.exports = {
    copyFile,
    exists,
    copySingleFile,
    mkdirp,
    delFile
};
