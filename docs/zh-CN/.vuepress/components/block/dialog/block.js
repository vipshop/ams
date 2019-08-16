export default {
    defaultDialog: {
        type: 'component',
        operations: {
            addItem: {
                type: 'button',
                label: '点击打开弹窗'
            }
        },
        events: {
            addItem: '@adminAddDialog.show'
        },
        blocks: {
            adminAddDialog: {
                type: 'dialog',
                data: {
                    title: '添加'
                },
                props: {
                    'append-to-body': true
                },
                operations: {
                    submit: {
                        type: 'button',
                        label: '提交',
                        props: {
                            type: 'primary'
                        }
                    },
                    hide: {
                        type: 'button',
                        label: '关闭'
                    }
                },
                actions: {
                    submit() {
                        this.$message('你点击了提交按钮')
                    }
                },
                blocks: {
                    dialogText: {
                        type: 'component',
                        options: {
                            is: 'div',
                            text: "我是弹窗内容"
                        }
                    }
                }
            }
        }
    },
    dialog2: {
        type: 'component',
        operations: {
            addItem: {
                type: 'button',
                label: '点击打开弹窗'
            }
        },
        events: {
            addItem: '@adminAddDialog.show'
        },
        blocks: {
            adminAddDialog: {
                type: 'dialog',
                data: {
                    title: '添加'
                },
                props: {
                    'append-to-body': true
                },
                operations: {
                    submit: {
                        type: 'button',
                        label: '提交',
                        props: {
                            type: 'primary'
                        }
                    },
                    hide: {
                        type: 'button',
                        label: '关闭'
                    }
                },
                events: {
                    submit: 'addDialogForm.submit'
                },
                blocks: {
                    addDialogForm: {
                        type: 'form',
                        resource: {
                            fields: {
                                text: {
                                    label: '新文本',
                                    type: 'text'
                                },
                                date: {
                                    type: 'date',
                                    label: '日期'
                                },
                                password: {
                                    type: 'password',
                                    label: '密码'
                                }
                            }
                        },
                        ctx: 'edit',
                        events: {
                            submit: '@validate @add @adminAddDialog.hide @clear'
                        },
                        actions: {
                            add(){
                                this.callAction('@adminListView.add', {item: this.data})
                            },
                            clear() {
                                // 清空表单数据
                                this.data = {}
                            }
                        }
                    }
                }
            }
        }
    }
}
