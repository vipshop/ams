import ams from '@ams-team/ams';
import outsideFile from './cases-sence/outside-file';
import { prefix, configCodePrefix } from '@/utils';

ams.block('router', {
    type: 'router',
    data: {
        roles: ['admin'],
        logo: '//h5rsc.vipstatic.com/ams/ams-logo2.png?20191105', // 系统logo（只有使用vipshop的UI主题才会显示）
        logoPath: '/',
        title: 'AMS在线示例', // 系统标题（只有使用vipshop的UI主题才会显示）
        userImg: '', // 用户头像（如果头像为空，则用默认头像）
        userName: '' // 用户名字（如果名字为空则不展示用户信息模块）
    },
    events: {
        init: '@getUsers'
    },
    actions: {
        async getUsers() {
            const res = await ams.request({
                url: `${prefix}getUser`,
                method: 'GET'
            });
            if (
                res.data &&
                res.data.code === 0
            ) {
                this.data.userImg = res.data.data.userImg;
                this.data.userName = res.data.data.userName;
            } else {
                this.$message.error(`${res.data.msg}(${res.data.code})`);
            }
        },
        // 退出登录函数
        loginOut() {
            alert('你点击了退出按钮');
            location.href = '//vip.com/user/logout';
        }
    },
    router: {
        // keepAlive: true, // 设置为true的话，所有菜单都会keepAlive
        // mode: 'history',
        // base: '/app/', // 要在history下才会发挥作用
        // showMenu: false,   // 隐藏所有菜单配置项，默认为true
        // forcedRefresh: true, // 点击当前菜单（非外链）是否强制刷新渲染
        uniqueOpened: true, // 是否只保持一个子菜单的展开
        // backgroundColor: '#304156', // 菜单的背景色（仅支持 hex 格式），默认值：#304156
        // textColor: '#bfcbd9', // 菜单的文字颜色（仅支持 hex 格式），默认值：#bfcbd9
        // activeTextColor: '#409EFF', // 菜单的文字颜色（仅支持 hex 格式），默认值：#409EFF
        // defaultBreadcrumb: false, // 默认为true，会把首个route作为默认首页加到所有面包屑，设置为false禁用此行为， 0.7.5+支持
        // showBreadcrumb: false, // 默认为true，是否显示面包屑
        routes: [
            {
                name: '首页',
                path: '',
                block: 'index',
                class: 'ams-test-class',
                // redirect: '/list',
                meta: {
                    icon: 'el-icon-menu'
                },
                tooltip: {
                    content: '首页提示文字'
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
                        name: '对象字段',
                        path: 'object',
                        block: 'object'
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
                        name: '视频上传',
                        path: 'video',
                        block: 'video'
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
                    },
                    {
                        name: 'Select选择器',
                        path: 'select',
                        block: 'select'
                    }
                ]
            },
            {
                name: '区块示例',
                path: 'cases-block',
                meta: {
                    icon: 'ams-icon-account-sales',
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
                            },
                            {
                                name: '列表拖拽',
                                path: 'list-drag',
                                block: 'list-drag'
                            },
                            {
                                name: '字段处理',
                                path: 'list-field-convert',
                                block: 'list-field-convert'
                            },
                            {
                                name: '前端分页',
                                path: 'list-simulate',
                                block: 'list-simulate'
                            },
                            {
                                name: 'tab中的list',
                                path: 'list-tab',
                                block: 'list-tab'
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
                        name: '拖拽图片框（上下）',
                        path: 'dragimage-updown',
                        block: 'dragimage-updown'
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
                        name: '标题',
                        path: 'title',
                        block: 'title'
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
                        name: '气泡确认框',
                        path: 'popconfirm',
                        block: 'popconfirm'
                    },
                    {
                        name: '抽屉',
                        path: 'drawer',
                        block: 'drawer'
                    },
                    {
                        name: 'bct定制进度条',
                        path: 'bct-progress',
                        block: 'bct-progress'
                    },
                    {
                        name: 'Alert告警',
                        path: 'alert',
                        block: 'alert'
                    },
                    {
                        name: '时间线',
                        path: 'timeline',
                        block: 'timeline'
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
                        name: 'OA搜索示例',
                        path: 'remote-oa',
                        block: 'remote-oa'
                    },
                    {
                        name: 'array & object',
                        path: 'array-object',
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
                name: 'Github',
                meta: {
                    icon: 'el-icon-star-off'
                },
                path: 'https://github.com/vipshop/ams',
                target: '_blank'
            },
            {
                name: '文档',
                meta: {
                    icon: 'ams-icon-help-center'
                },
                path: 'https://vipshop.github.io/ams/',
                target: '_blank'
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
        beforeEach: function(to, from, next) {
            let href = '';
            switch (to.meta.path) {
                case '/':
                    href = '/index.js';
                    break;
                default:
                    href = to.meta.path + '.js';
                    break;
            }
            if (ams.$blocks.configCodeBlock) {
                ams.$blocks.configCodeBlock.block.props.href = configCodePrefix + href;
            } else {
                ams.blocks.configCodeBlock.props.href = configCodePrefix + href;
            }
            next();
        }
    },
    blocks: {
        menuBottom: {
            type: 'component',
            options: {
                is: 'div',
                text: '@2019 www.vip.com'
            },
            style: {
                color: '#777',
                padding: '50px 10px 15px',
                'font-size': '12px',
                'text-align': 'center'
            },
            slot: 'menuBottom'
        },
        navRightNav: {
            slot: 'nav-left',
            type: 'dropdown',
            style: {
                float: 'right',
                'padding-left': '15px'
            },
            props: {
                trigger: 'click'
            },
            options: {
                menu: '点击触发下拉',
                menuItems: [{
                    text: '黄金糕',
                    props: {
                        command: 'a',
                        icon: 'el-icon-plus'
                    }
                }, {
                    text: '狮子头',
                    props: {
                        command: 'b',
                        icon: 'el-icon-circle-plus'
                    }
                }, {
                    text: '螺蛳粉',
                    props: {
                        command: 'c',
                        icon: 'el-icon-circle-plus-outline'
                    }
                }]
            },
            on: {
                command: function(e) {
                    this.$message('click on item ' + e);
                }
            }
        },
        configCodeBlock: {
            type: 'component',
            options: {
                is: 'a'
            },
            slot: 'nav-left',
            style: {
                position: 'fixed',
                right: '0px',
                top: '75px',
                'z-index': 100,
                width: '50px',
                height: '32px',
                'line-height': '32px',
                border: '1px solid #eee',
                'border-radius': '32px 0 0 32px',
                'padding-left': '15px',
                'box-shadow': '-2px 2px 5px 0 #eee',
                color: '#333',
                backgroundColor: '#fff'
            },
            props: {
                title: '查看配置',
                class: 'ams-icon-code',
                target: '_blank',
                href: ''
            }
        }
    }
});
