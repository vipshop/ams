import ams from '@ams-team/ams';

ams.block('router', {
    type: 'router',
    data: {
        roles: ['admin']
    },
    router: {
        // mode: 'history',
        // base: '/app/', // 要在history下才会发挥作用
        // showMenu: 'false',   // 隐藏所有菜单配置项，默认为true
        routes: [
            {
                name: '首页',
                path: '',
                block: 'index',
                meta: {
                    icon: 'el-icon-menu'
                }
            },
            {
                name: '列表',
                path: 'list',
                block: 'list',
                meta: {
                    icon: 'el-icon-document'
                }
            },
            {
                name: '404',
                path: '404',
                block: '404',
                meta: {
                    hasMenu: false,
                    hidden: true
                }
            },
            {
                name: '可视化示例',
                path: 'chart-demo1',
                meta: {
                    icon: 'el-icon-video-camera-solid',
                    noRedirect: true
                },
                block: 'chart-demo1'
            },
            {
                name: '外链',
                meta: {
                    icon: 'el-icon-star-off'
                },
                path: 'http://vip.com',
                target: '_self'
            },
            {
                name: '跳404',
                redirect: '/404',
                meta: {
                    icon: 'el-icon-error'
                }
            },
            {
                path: '*',
                redirect: '/404',
                meta: {
                    hidden: true
                }
            }
        ]
    },
    on: {
        async beforeEach(to, from, next) {
            const data = await this.$api.base.getUsername();
            await this.$store.dispatch('set-username', data.userName);
            this.callAction('@navUser.getUsers');
            next();
        }
    },
    blocks: {
        menuTop: {
            type: 'component',
            options: {
                is: 'img'
            },
            style: {
                width: '80px',
                height: '80px',
                margin: '20px auto 0'
            },
            props: {
                src: '//h5rsc.vipstatic.com/ams/ams-logo.png'
            },
            slot: 'menuTop'
        },
        menuBottom: {
            type: 'component',
            options: {
                is: 'div',
                text: 'www.vip.com'
            },
            style: {
                color: '#777',
                padding: '30px 10px 15px',
                'font-size': '12px'
            },
            slot: 'menuBottom'
        },
        navUser: {
            type: 'nav-user',
            data: {
                userImg: '',
                userName: ''
            },
            actions: {
                async getUsers() {
                    const userName = this.$store.state.base.userName;
                    this.data.userName = userName;
                },
                // 退出登录函数
                loginOut() {
                    location.href = '//xxx.com/user/logout';
                }
            },
            slot: 'nav'
        }
    }
});
