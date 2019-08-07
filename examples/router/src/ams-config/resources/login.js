import ams from '@ams-team/ams';

ams.resource('login', {
    api: {
        prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
        create: 'login'
    },
    fields: {
        username: {
            type: 'text',
            label: '用户名',
            rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
        },
        password: {
            type: 'password',
            label: '密码',
            rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
    }
});
