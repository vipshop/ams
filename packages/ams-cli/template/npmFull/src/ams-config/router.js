import ams from '@ams-team/ams';

ams.block('router', {
    type: 'router',
    data: {
        logo: '//h5rsc.vipstatic.com/ams/ams-logo2.png?20191105', // 系统logo（只有使用vipshop的UI主题才会显示）
        title: 'AMS在线示例', // 系统标题（只有使用vipshop的UI主题才会显示）
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
                    icon: 'menu'
                }
            },
            {
                name: '列表',
                path: 'list',
                block: 'list',
                meta: {
                    icon: 'document'
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
                    icon: 'video-camera-solid',
                    noRedirect: true
                },
                block: 'chart-demo1'
            },
            {
                name: '外链',
                meta: {
                    icon: 'star-off'
                },
                path: 'http://vip.com',
                target: '_self'
            },
            {
                name: '跳404',
                redirect: '/404',
                meta: {
                    icon: 'error'
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
    blocks: {
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
        }
    }
});
