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
                // redirect: '/list',
                meta: {
                    icon: 'menu'
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
                name: 'login',
                path: 'login',
                block: 'login',
                meta: {
                    hasMenu: false,
                    hidden: true
                }
            },
            {
                name: '动态路径参数',
                path: 'haha/:id/:name',
                block: 'list',
                meta: {
                    hasMenu: true,
                    hidden: true
                }
            },
            {
                name: '列表 & 表单',
                path: 'list',
                meta: {
                    icon: 'document',
                    noRedirect: true
                },
                children: [
                    {
                        name: '列表',
                        path: 'list',
                        block: 'list'
                    },
                    {
                        name: '列表操作',
                        path: 'list-operations',
                        block: 'list-operations'
                    },
                    {
                        name: '列表布局',
                        path: 'list-layout',
                        block: 'list-layout'
                    },
                    {
                        name: '编辑',
                        path: 'edit',
                        block: 'form-edit',
                        meta: {
                            roles: ['admin', 'edit']
                        }
                    },
                    {
                        name: '查看',
                        path: 'view',
                        block: 'form-view',
                        meta: {
                            roles: ['admin', 'view']
                        }
                    }
                ]
            },
            {
                name: '场景示例',
                path: 'cases-sence',
                meta: {
                    icon: 'video-camera-solid',
                    noRedirect: true
                },
                children: [
                    {
                        name: '远程select',
                        path: 'select',
                        block: 'remote-select'
                    },
                    {
                        name: 'OA搜索示例',
                        path: 'select-oa',
                        block: 'remote-oa'
                    },
                    {
                        name: 'array & object',
                        path: 'array',
                        block: 'array-object'
                    },
                    {
                        name: 'admin示例',
                        path: 'admin',
                        block: 'admin'
                    },
                    {
                        name: 'table',
                        path: 'table',
                        block: 'table'
                    },
                    {
                        name: '动态增加block',
                        path: 'runtime-add-block',
                        block: 'runtime-add-block'
                    },
                    {
                        name: 'get-set-view',
                        path: 'get-set-view',
                        block: 'get-set-view'
                    },
                    {
                        name: '权限 & 登录',
                        path: 'login-auth',
                        block: 'login-auth'
                    },
                    {
                        name: '快速添加修改action',
                        path: 'add-item-action',
                        block: 'add-item-action'
                    }
                ]
            },
            {
                name: '字段示例',
                path: 'cases-field',
                meta: {
                    icon: 'view',
                    noRedirect: true
                },
                children: [
                    {
                        name: 'component',
                        path: 'component',
                        block: 'component'
                    },
                    {
                        name: '日期',
                        path: 'date',
                        block: 'date'
                    },
                    {
                        name: '编辑器',
                        path: 'editor',
                        block: 'editor'
                    },
                    {
                        name: '单位选择',
                        path: 'unitselect',
                        block: 'unitselect'
                    },
                    {
                        name: '联合字段',
                        path: 'union',
                        block: 'union'
                    },
                    {
                        name: '原始文件上传',
                        path: 'originfile',
                        block: 'originfile'
                    },
                    {
                        name: '图片上传',
                        path: 'image',
                        block: 'image'
                    },
                    {
                        name: '树形控件',
                        path: 'tree',
                        block: 'tree'
                    },
                    {
                        name: 'arraylist',
                        path: 'arraylist',
                        block: 'arraylist'
                    },
                    {
                        name: '链接',
                        path: 'link',
                        block: 'link'
                    }
                ]
            },
            {
                name: '区块示例',
                path: 'cases-block',
                meta: {
                    icon: 'view',
                    noRedirect: true
                },
                children: [
                    {
                        name: '日历看板',
                        path: 'calendar',
                        block: 'calendar'
                    },
                    {
                        name: '折叠面板',
                        path: 'collapse',
                        block: 'collapse'
                    },
                    {
                        name: '步骤',
                        path: 'steps',
                        block: 'steps'
                    },
                    {
                        name: '卡片',
                        path: 'card',
                        block: 'card'
                    },
                    {
                        name: '下拉菜单',
                        path: 'dropdown',
                        block: 'dropdown'
                    },
                    {
                        name: '导入导出',
                        path: 'xlsx',
                        block: 'xlsx'
                    }
                ]
            },
            {
                name: '可视化示例',
                path: 'cases-chart',
                meta: {
                    icon: 'view',
                    noRedirect: true
                },
                children: [
                    {
                        name: '示例1',
                        path: 'chart-demo1',
                        block: 'chart-demo1'
                    },
                    {
                        name: '示例2',
                        path: 'chart-demo2',
                        block: 'chart-demo2'
                    }
                ]
            },
            {
                name: '外链',
                meta: {
                    icon: 'star-off'
                },
                path: 'http://www.baidu.com',
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
        }
    }
});
