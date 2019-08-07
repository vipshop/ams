import ams from '@ams-team/ams';

ams.block('login-auth', {
    type: 'component',
    options: {
        is: 'div',
    },
    actions: {
        needlogin() {
            this.$ams.request({
                url: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/needlogin'
            });
        },
        dosomething() {
            this.$ams.request({
                url: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/dosomething'
            });
        },
        test() {
            this.block.operations.test.label = '修改成功';
        }
    },
    operations: {
        needlogin: {
            type: 'button',
            label: '需登录的请求',
            // props: {
            //     type: 'primary'
            // }
        },
        dosomething: {
            type: 'button',
            label: '无权限的请求',
            // props: {
            //     type: 'primary'
            // }
        },
        test: {
            type: 'button',
            label: '修改operation',
            // props: {
            //     type: 'primary'
            // }
        }
    }
});
