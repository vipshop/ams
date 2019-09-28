import ams from '@ams-team/ams';
import outsideFile from './cases-sence/outside-file';

ams.block('router', {
    type: 'router',
    data: {
        roles: ['admin']
    },
    router: {
        // mode: 'history',
        // base: '/app/', // 要在history下才会发挥作用
        // showMenu: false,   // 隐藏所有菜单配置项，默认为true
        // forcedRefresh: true, // 点击当前菜单（非外链）是否强制刷新渲染
        uniqueOpened: true, // 是否只保持一个子菜单的展开
        routes: [
            {
                name: '首页',
                path: '',
                block: 'index',
                class: 'ams-test-class',
                // redirect: '/list',
                meta: {
                    icon: 'el-icon-menu'
                }
            },
            {
                name: '404',
                path: '404',
                block: '404',
                meta: {
                    hasMenu: false, // 该路由下是否显示左边栏菜单
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
                name: '字段示例',
                path: 'cases-field',
                meta: {
                    icon: 'el-icon-view',
                    noRedirect: true
                },
                children: [
                    // {
                    //     name: '定制日期',
                    //     path: 'plan-date',
                    //     block: 'plan-date'
                    // },
                    {
                        name: '输入框',
                        path: 'input',
                        block: 'input'
                    },
                    {
                        name: '单选',
                        path: 'radio',
                        block: 'radio'
                    },
                    {
                        name: '多选',
                        path: 'checkbox',
                        block: 'checkbox'
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
                    },
                    {
                        name: '级联选择',
                        path: 'cascader',
                        block: 'cascader'
                    }
                ]
            },
            {
                name: '区块示例',
                path: 'cases-block',
                meta: {
                    icon: 'el-icon-view',
                    noRedirect: true
                },
                children: [
                    {
                        name: '列表',
                        path: 'list',
                        children: [
                            {
                                name: '普通',
                                path: 'list',
                                block: 'list'
                            },
                            {
                                name: '操作',
                                path: 'list-operations',
                                block: 'list-operations'
                            },
                            {
                                name: '布局',
                                path: 'list-layout',
                                block: 'list-layout'
                            },
                            {
                                name: '编辑状态',
                                path: 'list-edit',
                                block: 'list-edit'
                            },
                            {
                                name: '假分页',
                                path: 'list-pagination',
                                block: 'list-pagination'
                            }
                        ]
                    },
                    {
                        name: '图片列表',
                        path: 'imagelist',
                        children: [
                            {
                                name: '带图片',
                                path: 'imagelist-images',
                                block: 'imagelist'
                            },
                            {
                                name: '纯文案',
                                path: 'imagelist-texts',
                                block: 'imagelist2'
                            }
                        ]
                    },
                    {
                        name: '表单',
                        path: 'form',
                        meta: {
                            roles: ['admin', 'edit']
                        },
                        children: [
                            {
                                name: '编辑',
                                path: 'edit',
                                block: 'form-edit'
                            },
                            {
                                name: '查看',
                                path: 'view',
                                block: 'form-view'
                            }
                        ]
                    },
                    {
                        name: '万能区块',
                        path: 'component',
                        block: 'component'
                    },
                    // {
                    //     name: '日历看板',
                    //     path: 'calendar',
                    //     block: 'calendar'
                    // },
                    {
                        name: '拖拽图片框',
                        path: 'dragimage',
                        block: 'dragimage'
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
                    },
                    {
                        name: '网格布局',
                        path: 'grid',
                        block: 'grid'
                    },
                    {
                        name: '走马灯',
                        path: 'carousel',
                        block: 'carousel'
                    },
                    {
                        name: '回到顶部',
                        path: 'backtop',
                        block: 'backtop'
                    },
                    {
                        name: '表格',
                        path: 'table',
                        block: 'table'
                    },
                    {
                        name: '标签页',
                        path: 'tabs',
                        block: 'tabs'
                    },
                    {
                        name: '弹出框',
                        path: 'popover',
                        block: 'popover'
                    },
                    {
                        name: 'bct定制进度条',
                        path: 'bct-progress',
                        block: 'bct-progress'
                    }
                ]
            },
            {
                name: '场景示例',
                path: 'cases-sence',
                meta: {
                    icon: 'el-icon-video-camera-solid',
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
                    },
                    {
                        name: '可视化示例',
                        path: 'cases-chart',
                        meta: {
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
                        name: '引入外部文件',
                        path: 'cases-outside',
                        children: [
                            {
                                name: 'Vue文件引入A',
                                path: 'file1',
                                component: outsideFile
                            },
                            {
                                name: 'Vue文件引入B',
                                path: 'file2',
                                component: () => import('./cases-sence/outside-file')
                            },
                            {
                                name: '外部地址引入',
                                path: 'file3',
                                block: 'outside-website'
                            }
                        ]
                    }
                ]
            },
            {
                name: '外链',
                meta: {
                    icon: 'el-icon-star-off'
                },
                path: 'https://vipshop.github.io/ams/',
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
        }
    }
});
