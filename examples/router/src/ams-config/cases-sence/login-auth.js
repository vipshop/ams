import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('login-auth', {
    type: 'component',
    options: {
        is: 'div'
    },
    actions: {
        needlogin() {
            this.$ams.request({
                url: `${prefix}needlogin`
            });
        },
        dosomething() {
            this.$ams.request({
                url: `${prefix}noauthor`
            });
        },
        test() {
            this.block.operations.test.label = '修改成功';
        }
    },
    operations: {
        needlogin: {
            type: 'button',
            label: '需登录的请求'
        },
        dosomething: {
            type: 'button',
            label: '无权限的请求'
        },
        test: {
            type: 'button',
            label: '修改operation'
        }
    }
});
