#!/usr/bin/env node

const ghpages = require('gh-pages');
ghpages.publish('./docs/dist', {
    branch: 'gh-pages',
}, function(err) {
  console.log('docs同步完成!');
});
