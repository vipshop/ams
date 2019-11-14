#!/usr/bin/env node

const ghpages = require('gh-pages');
ghpages.publish('./docs/dist', {
    branch: 'gh-pages',
}, function(err) {
    if (err) {
        console.log(err.message);
    } else {
        console.log('docs同步完成!');
    }
});
