import ams from '@ams-team/ams';

ams.block('index', {
    blocks: {
        indexTitle1: {
            type: 'title',
            options: {
                title: '表单编辑状态'
            },
            style: {
                width: '50%',
                paddingRight: '2%'
            }
        },
        indexTitle2: {
            type: 'title',
            options: {
                title: '表单展示状态'
            },
            style: {
                width: '49%'
            }
        },
        formEditAll: {
            ctx: 'edit',
            type: 'form',
            resource: 'resource',
            style: {
                width: '50%',
                paddingRight: '2%'
            },
            data: {
                testRadio: 'c'
                // testText: ''
            },
            events: {
                init: '@read',
                submit: '@getData @validate @alert:我是一个alert @getAlert @getPrompt @confirm:确认提交吗? @update',
                cancel: '@cancel',
                dialog: 'demo-dialog.show'
            },
            props: {
                'label-bold': true // label 加粗
            },
            actions: {
                getData({ $prevReturn }) {
                    console.log('getData--', $prevReturn);
                },
                getAlert() {
                    // @alert:确认提交吗?
                    // 自定义数据通过options配置
                    this.emitEvent('alert', {
                        message: '这是一个alert的弹框',
                        options: {
                            title: '我是一个alert的标题'
                        }
                    });
                },
                getPrompt() {
                    // promt直接使用方式
                    this.$prompt('请输入邮箱', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        inputErrorMessage: '邮箱格式不正确'
                    }).then(({ value }) => {
                        this.$message({
                            type: 'success',
                            message: '你的邮箱是: ' + value
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                },
                fieldChange({ value, path }) {
                    if (path === 'testSwitch') {
                        // this.fields.testPassword.props.disabled = !value;
                        // this.$forceUpdate();
                        console.log(JSON.stringify(this.fields.testPassword.props));
                        // this.$set(this.fields.testPassword.props, 'disabled', !value);
                    }
                },
                cancel() {
                    this.$router.back();
                }
            },
            fields: {
                id: {
                    label: '新id名',
                    props: {
                        disabled: false,
                        'suffix-icon': 'ams-my-icon'
                    }
                }
                // testPassword: {
                //     props: {
                //         disabled: false
                //     }
                // }
                // 字段隐藏
                // testAudio: false
            },
            operations: {
                submit1: {
                    type: 'button',
                    label: '提交',
                    event: 'submit',
                    props: {
                        type: 'primary'
                    }
                },
                cancel: {
                    type: 'button',
                    label: '取消'
                },
                dialog: {
                    type: 'button',
                    label: '弹窗修改'
                }
            }
        },
        formViewAll: function() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('resolve formViewAll');
                    resolve({
                        ctx: 'view',
                        type: 'form',
                        resource: 'resource',
                        style: {
                            width: '49%'
                        },
                        data: {
                            testRadio: 'c'
                        },
                        events: {
                            init: '@read @console'
                        },
                        actions: {
                            console() {
                                console.log('@console action', this.data.id);
                            }
                        }
                    });
                }, 1000);
            });
        },
        'demo-dialog': {
            type: 'dialog',
            data: {
                title: '弹窗标题'
            },
            events: {
                submit: 'dialogFormEdit.submit @hide',
                show: '@show @loading @dialogFormEdit.test'
            },
            props: {
                // fullscreen: true
                // 'append-to-body': true
            },
            actions: {
                loading: function() {
                    this.showLoading();
                    setTimeout(() => {
                        this.hideLoading();
                    }, 5000);
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
            blocks: {
                dialogFormEdit: {
                    ctx: 'edit',
                    type: 'form',
                    resource: 'resource',
                    events: {
                        init: '@read',
                        submit: '@validate @update'
                    },
                    actions: {
                        test() {
                            console.log('test', this);
                        }
                    }
                }
            }
        }
    }
});
