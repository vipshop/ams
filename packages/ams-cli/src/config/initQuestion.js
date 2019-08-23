const { exists } = require('../utlis/fileHander');
const { execSync } = require('child_process');
const path = require('path');
const { renders } = require('./index');

exports.getDirName = function(
    defaultName = 'project',
    message = 'Please specify your dir name: ',
    prefix = ''
) {
    const question = {
        type: 'input',
        name: 'dirName',
        message,
        async validate(input) {
            const done = this.async();
            if (input.length === 0) {
                done('You must input dir name');
                return;
            }
            const dir = path.resolve(process.cwd(), prefix + input);
            if (await exists(dir)) {
                done(
                    'The dir name is already existed. Please change another name'
                );
            }
            done(null, true);
        }
    };
    if (defaultName) {
        question.default = defaultName;
    }
    return question;
};

exports.initQuestion = function(dirName, dirType) {
    let question = [];

    let user = execSync('git config --global user.name', {
        encoding: 'utf-8'
    });
    let email = execSync('git config --global user.email', {
        encoding: 'utf-8'
    });

    user = user.trim();
    email = email.trim();

    if (/npm/.test(dirType)) {
        question.push({
            type: 'input',
            name: 'version',
            message: 'version',
            default: '0.1.0'
        });
    } else if (dirType === 'field' || dirType === 'block') {
        question = [
            {
                type: 'input',
                name: 'version',
                message: 'version',
                default: '0.1.0'
            },
            {
                type: 'input',
                name: 'description',
                message: 'description'
            },
            {
                type: 'input',
                name: 'author',
                message: 'author',
                default: `${user} <${email}>`
            }
        ];
    }

    return question;
};

exports.initMetadata = function(dirName, dirType) {
    const meta = {
        name: dirName,
        npm: true
    };

    meta.render = renders[dirType] || false;

    if (dirType === 'script') {
        meta.npm = false;
    }

    // if (dirType === 'npmFull') {
    // }

    // if (dirType === 'npm') {
    // }

    if (dirType === 'field') {
        meta.npm = false;
    }

    if (dirType === 'block') {
        meta.npm = false;
    }

    return meta;
};
