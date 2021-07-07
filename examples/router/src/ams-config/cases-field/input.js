import ams from '@ams-team/ams';

ams.block('input', {
    resources: {
        input: {
            fields: {
                text1: {
                    label: 'text1',
                    type: 'text',
                    labelWidth: '80px'
                },
                text2: {
                    label: 'text2',
                    type: 'text',
                    labelWidth: '50px',
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
                    labelWidth: '80px',
                    slots: {
                        suffix: '输入框尾部内容'
                    }
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
                },
                text9: {
                    label: '尺寸',
                    type: 'text',
                    style: {
                        width: '150px'
                    },
                    props: {
                        inline: true
                    },
                    slots: {
                        prefix: '高',
                        suffix: 'px'
                    }
                },
                text10: {
                    label: '',
                    labelWidth: '0',
                    type: 'text',
                    style: {
                        width: '150px'
                    },
                    props: {
                        inline: true
                    },
                    slots: {
                        prefix: '宽',
                        suffix: 'px'
                    }
                },
                text11: {
                    label: '样式名',
                    type: 'text',
                    ctx: 'view',
                    props: {
                        'class': 'el-icon-upload-success  el-icon-circle-check'
                    }
                }
            }
        }
    },
    blocks: {
        editInput: {
            ctx: 'edit',
            type: 'form',
            resource: 'input',
            data: {
                text7: '测试文字',
                text11: '上传成功'
            },
            layout: {
                text1: ['text1', 'text2']
            }
        }
    }
});
