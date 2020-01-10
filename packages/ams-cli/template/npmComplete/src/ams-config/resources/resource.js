import ams from '@ams-team/ams';

// http://localhost:9526/examples/router/mock/list.json

ams.resource('resource', {
    key: 'id',
    api: {
        prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
        create: 'create',
        update: 'update',
        read: 'read',
        delete: 'delete',
        list: 'list'
    },
    fields: {
        // a: {
        //     type: 'text',
        //     label: 'a',
        //     show: {
        //         name: 'id',
        //         value: '1'
        //     },
        //     rules: [
        //         { required: true, message: '请输入活动名称', trigger: 'blur' }
        //     ]
        // },
        // b: {
        //     type: 'text',
        //     label: 'b',
        //     show: 'testSwitch'
        // },
        // c: {
        //     type: 'text',
        //     label: 'c',
        //     show(context) {
        //         // console.log(context)
        //         if (!context.testSwitch) {
        //             return true;
        //         }
        //     }
        // },

        id: {
            type: 'text',
            label: 'id',
            // hidden: true,
            on: {
                change: function(...args) {
                    console.log('text change', args, this);
                }
            }
            // props: {
            //     align: 'left',
            //     'header-align': 'center'
            // }
        },
        precent: {
            type: 'text',
            props: {
                disabled: false,
                'suffix-icon': 'ams-my-icon'
            },
            style: {
                width: '100px'
            },
            get(val) {
                return isFinite(val) ? Math.floor(val * 100) : '';
            },
            set(val) {
                return isFinite(val) ? (val / 100).toFixed(2) : '';
            }
        },
        testArrays: {
            type: 'array',
            info: '提示信息',
            label: 'testTexts',
            field: {
                type: 'text',
                label: 'testTexts',
                props: {
                    'suffix-icon': 'el-icon-service'
                }
            }
        },
        testText: {
            type: 'text',
            label: '文本',
            rules: [
                { required: true, message: '请输入活动名称', trigger: 'blur' },
                {
                    min: 3,
                    max: 5,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }
            ],
            props: {
                'suffix-icon': 'el-icon-service'
            }
        },
        testDate: {
            type: 'date',
            label: '日期'
        },
        testTime: {
            type: 'time',
            label: '时间1',
            rules: [
                { required: true, message: '请输入时间1', trigger: 'blur' }
            ]
        },
        testDatetime: {
            type: 'datetime',
            label: '时间2',
            rules: [
                { required: true, message: '请输入时间2', trigger: 'blur' }
            ]
        },
        testSwitch: {
            type: 'switch',
            label: '开关',
            props: {
                inline: true,
                formItemWidth: '40%'
            }
        },
        testPassword: {
            type: 'password',
            info: 'ssss',
            label: '密码',
            props: {
                inline: true,
                formItemWidth: '40%'
            }
        },
        testColor: {
            type: 'color',
            label: '颜色',
            props: {
                inline: true,
                formItemWidth: '40%'
            }
        },
        testRate: {
            type: 'rate',
            label: '评分',
            props: {
                inline: true,
                formItemWidth: '40%'
            }
        },
        testRadio: {
            type: 'radio',
            label: '单选1',
            props: {
                options: {
                    a: '黄金糕',
                    b: '双皮奶',
                    c: '蚵仔煎',
                    d: '龙须面',
                    e: '北京烤鸭',
                    1: '哈哈哈'
                }
            }
        },
        testRadioArray: {
            type: 'radio',
            label: '单选2',
            props: {
                options: [{
                    label: '黄金糕',
                    value: 0
                }, {
                    label: '双皮奶',
                    value: 1
                }, {
                    label: '蚵仔煎',
                    value: 2,
                    disabled: true
                }, {
                    label: '龙须面',
                    value: 'd',
                    border: true
                }, {
                    label: '北京烤鸭',
                    value: 'e'
                }, {
                    label: '哈哈哈',
                    value: 5
                }]
            }
        },
        testCheckbox: {
            type: 'checkbox',
            label: '多选1',
            props: {
                options: {
                    a: '黄金糕',
                    b: '双皮奶',
                    c: '蚵仔煎',
                    d: '龙须面',
                    e: '北京烤鸭',
                    222: '哈哈哈',
                    0: '000'
                }
            },
            rules: [
                { required: true, message: '请输入活动名称', trigger: 'change' }
            ]
        },
        testTextarea: {
            type: 'textarea',
            label: '文本框',
            collapseLimit: 15
        },
        testCheckboxArray: {
            type: 'checkbox',
            label: '多选2',
            collapseLimit: 2,
            // useStringValue: false,
            props: {
                options: [{
                    label: '黄金糕',
                    value: 'a',
                    disabled: true
                }, {
                    label: '双皮奶',
                    value: 'b'
                }, {
                    label: '蚵仔煎',
                    value: 'c'
                }, {
                    label: '哈哈哈',
                    value: 222,
                    border: true
                }, {
                    label: '龙须面',
                    value: 'd',
                    border: true
                }, {
                    label: '北京烤鸭',
                    value: 'e'
                }]
            }
        },
        testSelect: {
            BASE: 'SELECT_REMOTE',
            ctx: 'view',
            label: '远程selectView',
            type: 'select',
            remoteConfig: {
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                queryKey: 'requiredName',
                labelKey: 'name'
            }
        },

        testCascader: {
            type: 'cascader',
            label: '级联选择',
            props: {
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [
                            {
                                value: 'shejiyuanze',
                                label: '设计原则',
                                children: [
                                    {
                                        value: 'yizhi',
                                        label: '一致'
                                    },
                                    {
                                        value: 'fankui',
                                        label: '反馈'
                                    },
                                    {
                                        value: 'xiaolv',
                                        label: '效率'
                                    },
                                    {
                                        value: 'kekong',
                                        label: '可控'
                                    }
                                ]
                            },
                            {
                                value: 'daohang',
                                label: '导航',
                                children: [
                                    {
                                        value: 'cexiangdaohang',
                                        label: '侧向导航'
                                    },
                                    {
                                        value: 'dingbudaohang',
                                        label: '顶部导航'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'zujian',
                        label: '组件',
                        children: [
                            {
                                value: 'basic',
                                label: 'Basic',
                                children: [
                                    {
                                        value: 'layout',
                                        label: 'Layout 布局'
                                    },
                                    {
                                        value: 'color',
                                        label: 'Color 色彩'
                                    },
                                    {
                                        value: 'typography',
                                        label: 'Typography 字体'
                                    },
                                    {
                                        value: 'icon',
                                        label: 'Icon 图标'
                                    },
                                    {
                                        value: 'button',
                                        label: 'Button 按钮'
                                    }
                                ]
                            },
                            {
                                value: 'form',
                                label: 'Form',
                                children: [
                                    {
                                        value: 'radio',
                                        label: 'Radio 单选框'
                                    },
                                    {
                                        value: 'checkbox',
                                        label: 'Checkbox 多选框'
                                    },
                                    {
                                        value: 'input',
                                        label: 'Input 输入框'
                                    },
                                    {
                                        value: 'input-number',
                                        label: 'InputNumber 计数器'
                                    },
                                    {
                                        value: 'select',
                                        label: 'Select 选择器'
                                    },
                                    {
                                        value: 'cascader',
                                        label: 'Cascader 级联选择器'
                                    },
                                    {
                                        value: 'switch',
                                        label: 'Switch 开关'
                                    },
                                    {
                                        value: 'slider',
                                        label: 'Slider 滑块'
                                    },
                                    {
                                        value: 'time-picker',
                                        label: 'TimePicker 时间选择器'
                                    },
                                    {
                                        value: 'date-picker',
                                        label: 'DatePicker 日期选择器'
                                    },
                                    {
                                        value: 'datetime-picker',
                                        label: 'DateTimePicker 日期时间选择器'
                                    },
                                    {
                                        value: 'upload',
                                        label: 'Upload 上传'
                                    },
                                    {
                                        value: 'rate',
                                        label: 'Rate 评分'
                                    },
                                    {
                                        value: 'form',
                                        label: 'Form 表单'
                                    }
                                ]
                            },
                            {
                                value: 'data',
                                label: 'Data',
                                children: [
                                    {
                                        value: 'table',
                                        label: 'Table 表格'
                                    },
                                    {
                                        value: 'tag',
                                        label: 'Tag 标签'
                                    },
                                    {
                                        value: 'progress',
                                        label: 'Progress 进度条'
                                    },
                                    {
                                        value: 'tree',
                                        label: 'Tree 树形控件'
                                    },
                                    {
                                        value: 'pagination',
                                        label: 'Pagination 分页'
                                    },
                                    {
                                        value: 'badge',
                                        label: 'Badge 标记'
                                    }
                                ]
                            },
                            {
                                value: 'notice',
                                label: 'Notice',
                                children: [
                                    {
                                        value: 'alert',
                                        label: 'Alert 警告'
                                    },
                                    {
                                        value: 'loading',
                                        label: 'Loading 加载'
                                    },
                                    {
                                        value: 'message',
                                        label: 'Message 消息提示'
                                    },
                                    {
                                        value: 'message-box',
                                        label: 'MessageBox 弹框'
                                    },
                                    {
                                        value: 'notification',
                                        label: 'Notification 通知'
                                    }
                                ]
                            },
                            {
                                value: 'navigation',
                                label: 'Navigation',
                                children: [
                                    {
                                        value: 'menu',
                                        label: 'NavMenu 导航菜单'
                                    },
                                    {
                                        value: 'tabs',
                                        label: 'Tabs 标签页'
                                    },
                                    {
                                        value: 'breadcrumb',
                                        label: 'Breadcrumb 面包屑'
                                    },
                                    {
                                        value: 'dropdown',
                                        label: 'Dropdown 下拉菜单'
                                    },
                                    {
                                        value: 'steps',
                                        label: 'Steps 步骤条'
                                    }
                                ]
                            },
                            {
                                value: 'others',
                                label: 'Others',
                                children: [
                                    {
                                        value: 'dialog',
                                        label: 'Dialog 对话框'
                                    },
                                    {
                                        value: 'tooltip',
                                        label: 'Tooltip 文字提示'
                                    },
                                    {
                                        value: 'popover',
                                        label: 'Popover 弹出框'
                                    },
                                    {
                                        value: 'card',
                                        label: 'Card 卡片'
                                    },
                                    {
                                        value: 'carousel',
                                        label: 'Carousel 走马灯'
                                    },
                                    {
                                        value: 'collapse',
                                        label: 'Collapse 折叠面板'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'ziyuan',
                        label: '资源',
                        children: [
                            {
                                value: 'axure',
                                label: 'Axure Components'
                            },
                            {
                                value: 'sketch',
                                label: 'Sketch Templates'
                            },
                            {
                                value: 'jiaohu',
                                label: '组件交互文档'
                            }
                        ]
                    }
                ]
            }
        },
        testTransfer: {
            type: 'transfer',
            label: '穿梭框',
            props: {
                options: [
                    {
                        value: 'a',
                        label: '黄金糕'
                    },
                    {
                        value: 'b',
                        label: '双皮奶'
                    },
                    {
                        value: 'c',
                        label: '蚵仔煎'
                    },
                    {
                        value: 'd',
                        label: '龙须面'
                    },
                    {
                        value: 'e',
                        label: '北京烤鸭'
                    }
                ]
            }
        },
        testDatetimerange: {
            type: 'datetimerange',
            label: '时间范围'
        },
        testSlider: {
            type: 'slider',
            desc: `只能上传jpg/png文件，且不超过500kb`,
            label: '滑块'
        },
        testProgress: {
            type: 'progress',
            label: '进度'
        },
        testInputnumber: {
            type: 'inputnumber',
            label: '数字输入'
        },
        testImage: {
            type: 'image',
            label: '图片上传',
            tip: '只能上传jpg/png文件，且不超过500kb',
            successUrlKey: 'url',
            props: {
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
            }
        },
        testHeadImage: {
            type: 'image',
            label: '头像',
            tip: '只能上传jpg/png文件，且不超过500kb',
            successUrlKey: 'url',
            props: {
                type: 'headimage',
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
            }
        },
        testFile: {
            type: 'file',
            label: '文件上传',
            tip: '只能上传jpg/png文件，且不超过500kb',
            successUrlKey: 'url',
            props: {
                'on-preview': function (params) {
                },
                'button-label': '导入',
                // multiple: true,
                // drag: true,
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
            }
        },
        testVideo: {
            type: 'video',
            label: '视频',
            tip: '只能上传视频文件',
            successUrlKey: 'url',
            props: {
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image',
                'button-label': '选择视频'
            }
        },
        testAudio: {
            type: 'audio',
            label: '音频',
            tip: '只能上传音频文件',
            successUrlKey: 'url',
            props: {
                action: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/upload-image'
            }
        },
        testTree: {
            type: 'tree',
            label: '树形控件',
            props: {
                options: [{
                    value: 1,
                    label: '一级 1',
                    children: [{
                        value: 4,
                        label: '二级 1-1',
                        children: [{
                            value: 9,
                            label: '三级 1-1-1',
                            children: [{
                                value: 91,
                                label: '四级 1-1-1-1'
                            }, {
                                value: 92,
                                label: '四级 1-1-1-2'
                            }]
                        }, {
                            value: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    value: 2,
                    label: '一级 2',
                    children: [{
                        value: 5,
                        label: '二级 2-1'
                    }, {
                        value: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    value: 3,
                    label: '一级 3',
                    children: [{
                        value: 7,
                        label: '二级 3-1'
                    }, {
                        value: 8,
                        label: '二级 3-2'
                    }]
                }]
            }
        }
        // testEditor: {
        //     type: 'editor',
        //     label: '富文本',
        //     props: {
        //         action: 'https://jsonplaceholder.typicode.com/posts/'
        //     }
        // },
        // testMarkdown: {
        //     type: 'markdown',
        //     label: 'markdown',
        //     props: {
        //         action: 'https://jsonplaceholder.typicode.com/posts/'
        //     }
        // }
    }
});
