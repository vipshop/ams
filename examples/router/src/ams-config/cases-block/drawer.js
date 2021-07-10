import ams from '@ams-team/ams';

ams.block('drawer', {
    blocks: {
        drawer1: {
            type: 'component',
            operations: {
                drawer1: {
                    type: 'button',
                    label: '示例1',
                    event: 'drawerPop.show'
                }
            }
        },
        drawerPop: {
            type: 'drawer',
            data: {
                title: '普通示例1',
                visible: false
            },
            operations: {
                add: {
                    type: 'button',
                    label: '按钮',
                    props: {
                        type: 'primary'
                    }
                },
                hide: {
                    type: 'button',
                    label: '取消'
                }
            },
            blocks: {
                drawerForm: {
                    type: 'form',
                    resource: {
                        fields: {
                            text1: {
                                label: 'text1',
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
                    },
                    ctx: 'edit',
                    data: {
                        text7: '测试文字',
                        text11: '上传成功'
                    }
                }
            }
        }

    }
});
