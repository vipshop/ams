import {prefix} from '../../utils/common'

export default {
    defaultRouter: {
        type: 'router',
        resources: {
            routerRes: {
                api: {
                    prefix,
                    read: 'read'
                },
                fields: {
                    testDate: {
                        type: 'date',
                        label: '日期'
                    },
                    testSwitch: {
                        type: 'switch',
                        label: '开关'
                    }
                }
            }
        },
        router: {
            routes: [
                {
                    path: '',
                    name: '首页',
                    block: 'formEditAll',
                    meta: {
                        icon: 'el-icon-menu'
                    }
                },
                {
                    path: '/list',
                    name: '列表页',
                    block: 'listComponent',
                    meta: {
                        icon: 'ams-icon-watcher'
                    }
                }
            ]
        },
        blocks: {
            formEditAll: {
                type: 'form',
                resource: 'routerRes',
                ctx: 'edit',
                style: {
                    width: '50%'
                },
                data: {
                    testRadio: 'c'
                },
                events: {
                    init: '@read',
                    submit: '@validate @update'
                },
                operations: {
                    submit: {
                        type: 'button',
                        event: 'submit',
                        label: '提交',
                        props: {
                            type: 'primary'
                        }
                    }
                }
            },
            listComponent: {
                type: 'component',
                options: {
                    is: 'div',
                    text: "我是插进来的TEXT内容",
                    html: '<h3>我是插进来的HTML内容</h3>'
                }
            }
        }
    },
    menuTopRouter: {
        type: 'router',
        router: {
            routes: [
                {
                    path: '',
                    name: '首页',
                    block: 'listComponent',
                    meta: {
                        icon: 'el-icon-menu'
                    }
                }
            ]
        },
        blocks: {
            listComponent: {
                type: 'component',
                options: {
                    is: 'div',
                    text: "我是插进来的TEXT内容",
                    html: '<h3>我是插进来的HTML内容</h3>'
                }
            },
            title1: {
                type: 'component',
                options: {
                    is: 'h3',
                    text: "AMS系统"
                },
                style: {
                    color: '#fff',
                    'text-align': 'center'
                },
                slot: 'menuTop'
            }
        }
    },
    menuBottomRouter: {
        type: 'router',
        router: {
            routes: [
                {
                    path: '',
                    name: '首页',
                    block: 'listComponent',
                    meta: {
                        icon: 'el-icon-menu'
                    }
                },
                {
                    path: '/menu1',
                    name: '菜单一',
                    meta: {
                        icon: 'el-icon-user-solid'
                    },
                    children: [{
                        name: "子菜单",
                        path: "path1_0",
                        block: 'listComponent',
                    }]
                },
                {
                    path: '/menu2',
                    name: '菜单二',
                    block: 'listComponent',
                    meta: {
                        icon: 'el-icon-star-on'
                    }
                },
                {
                    path: '/menu3',
                    name: '菜单三',
                    block: 'listComponent',
                    meta: {
                        icon: 'el-icon-s-help'
                    }
                }
            ]
        },
        blocks: {
            listComponent: {
                type: 'component',
                options: {
                    is: 'div',
                    text: "我是插进来的TEXT内容",
                    html: '<h3>我是插进来的HTML内容</h3>'
                }
            },
            menuBottomtext: {
                type: 'component',
                options: {
                    is: 'div',
                    text: "Copyright © 2008-2019 vip.com"
                },
                style: {
                    color: '#aaa',
                    'padding': '10px',
                    'margin-top': '100px',
                    'font-size': '12px'
                },
                slot: 'menuBottom'
            }
        }
    },
    navRouter: {
        type: 'router',
        router: {
            routes: [
                {
                    path: '',
                    name: '首页',
                    block: 'listComponent',
                    meta: {
                        icon: 'el-icon-menu'
                    }
                }
            ]
        },
        blocks: {
            listComponent: {
                type: 'component',
                options: {
                    is: 'div',
                    text: "我是插进来的TEXT内容",
                    html: '<h3>我是插进来的HTML内容</h3>'
                }
            },
            title1: {
                type: 'component',
                options: {
                    is: 'h3',
                    text: "AMS系统"
                },
                style: {
                    color: '#fff',
                    'text-align': 'center'
                },
                slot: 'menuTop'
            },
            navRouterTitle: {
                "type": "component",
                "options": {
                    "is": "div"
                },
                "operations": {
                    "feedback": {
                        "type": "button",
                        "label": "反馈",
                        "style": {
                            "margin-top": "5px",
                            "margin-right": "15px"
                        },
                        "props": {
                            "type": "text",
                            "icon": "el-icon-document",
                            "size": "large"
                        }
                    },
                    "help": {
                        "type": "button",
                        "label": "帮助",
                        "style": {
                            "margin-top": "5px"
                        },
                        "props": {
                            "type": "text",
                            "icon": "el-icon-question",
                            "size": "large"
                        }
                    }
                },
                "actions": {
                    "feedback": function() {
                        window.location.href = 'https://github.com/vipshop/ams/issues'
                    },
                    "help": function() {
                        window.location.href = 'https://github.com/vipshop/ams'
                    }
                },
                slot: 'nav'
            }
        }
    },
}
