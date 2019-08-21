var fs = require('fs');
var path = require('path');

module.exports = function () {
    const packagesPath = path.resolve(process.cwd(), './packages');
    const files = fs.readdirSync(packagesPath)
    // console.log(files)
    const packages = {}
    //遍历读取到的文件列表
    files.forEach(function(dirname){
        if(/^(?:block|field)-/.test(dirname)){
            // console.log(path.resolve(packagesPath, './', dirname))
            let pkgPath = path.resolve(packagesPath, dirname);
            const stat = fs.statSync(pkgPath);
            if(stat.isDirectory() && fs.existsSync(path.resolve(pkgPath, './package.json'))){
                let pkg = require(path.resolve(pkgPath, './package.json'));
                // console.log(pkg);
                let amsConfig = pkg.amsConfig || {};
                if(amsConfig.publish !== false){
                    let name = pkg.name.replace(/^@ams(?:-team)?\//, '');
                    amsConfig.version = pkg.version;
                    amsConfig.baseName = name;
                    packages[name] = amsConfig;
                }
            }
        }
    });
    return packages;
}