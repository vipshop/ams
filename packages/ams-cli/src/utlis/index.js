exports.versionCompare = function versionCompare(version1, version2) {
    version1 = version1.split('.');
    version2 = version2.split('.');
    const len = Math.max(version1.length, version2.length);
    let v1, v2;
    for (let i = 0; i < len; i++) {
        v1 = version1[i] || 0;
        v2 = version2[i] || 0;
        if (+v1 > +v2) {
            return 1;
        }
        if (+v1 < +v2) {
            return -1;
        }
    }
    return 0;
};
