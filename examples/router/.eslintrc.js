module.exports = {
    extends: [
        'eslint-config-alloy/vue',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // Vue: false
    },
    rules: {
        'no-throw-literal': 'off',
        'no-param-reassign': 'off',
        // eslint 的检测较弱、会误报、先关闭
        'vue/valid-template-root': 'off',
        // eslint 的检测较弱、会误报、先关闭
        'vue/require-component-is': 'off'
    }
};
