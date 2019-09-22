import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.resource('login', {
    api: {
        prefix: prefix,
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
