module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            '@babel/preset-env',
            {
                'modules': false,
                'loose': true,
                'targets': {
                    'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
                }
            }
        ]
    ];
    const plugins = [
        'transform-vue-jsx',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining'
    ];
    const env = {
        'test': {
            'presets': [['@babel/preset-env', { 'targets': { 'node': 'current' }}]]
        }
    };
    return {
        presets,
        plugins,
        env
    };
};
