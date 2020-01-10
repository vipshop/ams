import ams from '@ams-team/ams';

ams.block('login', {
    ctx: 'edit',
    type: 'form',
    resource: 'login',
    style: {
        width: '50%',
        marginLeft: '25%',
        paddingTop: '25%'
    },
    operations: {
        login: {
            type: 'button',
            label: '登录'
        }
    },
    data: {
        username: 'admin',
        password: 'admin'
    },
    events: {
        login: '@validate @goLogin @routerReplace:/'
    },
    actions: {
        async goLogin() {
            const res = await this.$ams.request({
                url: `${this.resource.api.prefix}login`,
                method: 'post',
                data: this.data
            });
            // 默认successCode
            if (res.data.code === 0) {
                this.$message.success('登录成功');
            }
        }
    }
});
