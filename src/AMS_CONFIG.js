const configContext = require.context('./', true, /^\.\/(?:blocks|fields|operations)\/\w+\/__config__\/[\w\.]+\.js$/);

const keys = configContext.keys();

const AMS_CONFIG = {
    field: {},
    operation: {},
    block: {}
};

keys.forEach(key => {
    // console.log('key', key);
    let keyArr = key.split('/');
    const type = keyArr[1].slice(0, -1);
    const name = keyArr[2];
    const file = keyArr[4];
    // console.log(type, name, file);
    if (!AMS_CONFIG[type][name]) {
        AMS_CONFIG[type][name] = {
            examples: {}
        };
    }
    let module = configContext(key);
    if (/\.example\.js$/.test(file)) {
        const exampleName = file.split('.')[0];
        AMS_CONFIG[type][name].examples[exampleName] = module.default;
    } else {
        AMS_CONFIG[type][name].defaults = module.defaults;
        AMS_CONFIG[type][name].config = module.config;
    }
});

//  AMS_CONFIG;

if (typeof window !== 'undefined') {
    window.AMS_CONFIG = AMS_CONFIG;
}

export default AMS_CONFIG;
