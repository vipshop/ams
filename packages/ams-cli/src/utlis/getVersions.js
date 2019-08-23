const latestVersion = require('latest-version');
const cache = {};

exports.getLatestVersion = async function getLatestVersion(name) {
    if (cache[name]) {
        return cache[name];
    }
    // console.log('cache', cache)
    const version = await latestVersion(name);
    // console.log('version', version)
    if (version) {
        cache[name] = version;
    }
    return version || 0;
};