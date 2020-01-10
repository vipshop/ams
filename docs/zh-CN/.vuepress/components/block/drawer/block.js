export default {
    defaultDrawer: {
        type: 'component',
        operations: {
            addItem: {
                type: 'button',
                label: '点击打开弹窗',
                event: 'adminAddDrawer.show'
            }
        },
        blocks: {
            adminAddDrawer: {
                type: 'drawer',
                data: {
                    title: '我是标题'
                },
                props: {
                    'append-to-body': true,
                    'before-close': function(done){
                        this.$confirm('确认关闭？')
                        .then(_ => {
                            done();
                        })
                        .catch(_ => {});
                    }
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
    drawer: {
        type: 'component',
        operations: {
            addItem: {
                type: 'button',
                label: '点击打开弹窗',
                event: 'adminDrawer.show'
            }
        },
        blocks: {
            adminDrawer: {
                type: 'drawer',
                props: {
                    'append-to-body': true
                },
                data: {
                    title: '添加'
                },
                blocks: {
                    addDrawerForm: {
                        ctx: 'edit',
                        type: 'form',
                        style: {
                            paddingRight: '20px'
                        },
                        resource: {
                            fields: {
                                text: {
                                    label: '新文本',
                                    type: 'text'
                                },
                                password: {
                                    type: 'password',
                                    label: '密码'
                                }
                            }
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
                            submit: '@validate @add @adminDrawer.hide @clear'
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
