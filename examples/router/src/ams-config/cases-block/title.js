import ams from '@ams-team/ams';

ams.block('title', {
    resources: {
    },
    /**
     * 配置区块
     */
    blocks: {
        titleBlock1: {
            type: 'title',
            options: {
                title: '标题类型的主标题'
            }
        },
        titleBlock2: {
            type: 'title',
            options: {
                title: '标题类型的主标题'
            },
            props: {
                'suffix-info': '我是提示' // 后缀提示
                // 'suffix-info-warning': '我是提示warning', // 后缀提示
                // 'suffix-info-danger': '我是提示danger' // 后缀提示
            }
        },
        titleBlock3: {
            type: 'title',
            options: {
                title: '标题类型的主标题'
            },
            props: {
                // 'suffix-info': '我是提示', // 后缀提示
                'suffix-info-warning': '我是提示warning' // 后缀提示
                // 'suffix-info-danger': '我是提示danger' // 后缀提示
            }
        },
        titleBlock4: {
            type: 'title',
            options: {
                title: '标题类型的主标题'
            },
            props: {
                // 'suffix-info': '我是提示', // 后缀提示
                // 'suffix-info-warning': '我是提示warning', // 后缀提示
                'suffix-info-danger': '我是提示danger' // 后缀提示
            }
        },
        titleBlock5: {
            type: 'title',
            options: {
                title: '标题类型的主标题',
                subTitle: '标题类型的副标题'
            }
        },
        titleBlock6: {
            type: 'title',
            options: {
                title: '标题类型的主标题',
                subTitle: '标题类型的副标题'
            },
            props: {
                'suffix-info': '我是提示' // 后缀提示
                // 'suffix-info-warning': '我是提示warning', // 后缀提示
                // 'suffix-info-danger': '我是提示danger' // 后缀提示
            }
        },
        titleBlock7: {
            type: 'title',
            options: {
                title: '标题类型的主标题后带弹出框提示'
                // subTitle: '标题类型的副标题'
            },
            props: {
                // 'suffix-info': '我是提示', // 后缀提示
                // 'suffix-info-warning': '我是提示warning', // 后缀提示
                // 'suffix-info-danger': '我是提示danger' // 后缀提示
            },
            blocks: {
                titleBlock7Popover: {
                    type: 'popover',
                    slot: 'append',
                    props: {
                        title: '标题1'
                    },
                    style: {
                        fontSize: '12px',
                        color: '#1989fa'
                    },
                    slots: {
                        content: '弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容',
                        reference: '字段说明<i class="el-icon-question"></i>'
                    }
                }
            }
        }
    }
});
