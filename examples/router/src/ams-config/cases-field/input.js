import ams from '@ams-team/ams';

ams.block('input', {
    resources: {
        input: {
            fields: {
                text1: {
                    label: 'text1text1text1text1text1',
                    type: 'text'
                },
                text2: {
                    label: 'text2',
                    type: 'text',
                    slots: {
                        prefix: '输入'
                    },
                    props: {
                        class: 'is-required' // 样式名
                    }
                },
                text3: {
                    label: 'text3',
                    type: 'text',
                    slots: {
                        suffix: '输入框尾部内容'
                    },
                    // props: {
                    //     inline: true
                    // }
                },
                text4: {
                    label: 'text4',
                    type: 'text',
                    slots: {
                        prepend: 'Http://'
                    }
                },
                text5: {
                    label: 'text5',
                    type: 'text',
                    slots: {
                        append: '.com'
                    }
                },
                text6: {
                    label: '提示',
                    type: 'text',
                    info: '提示信息'
                },
                text7: {
                    label: '提示',
                    type: 'text',
                    ctx: 'view',
                    info: '提示信息',
                    props: {
                        // 'suffix-info': '我是提示', // 后缀提示
                        // 'suffix-info-warning': '我是提示warning', // 后缀提示
                        'suffix-info-danger': '我是提示danger' // 后缀提示
                    }
                }
            }
        }
    },
    blocks: {
        editInput: {
            // data: datas,
            type: 'form',
            resource: 'input',
            ctx: 'edit',
            style: {
                width: '50%'
            },
            data: {
                text7: '测试文字'
            }
        }
    }
});
