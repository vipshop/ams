export default {
    formEditAll: {
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
        props: {
            'label-width': '200px'
        }
    },
    formBtton: {
        type: 'form',
        resource: {
            fields: {
                text: {
                    type: 'text',
                    label: '文本',
                    rules: [
                        { required: true, message: '请输入文本', trigger: 'blur' },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    props: {
                        placeholder: '请输入字符，长度在 3 到 5 个',
                        'suffix-icon': 'el-icon-service'
                    }
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
        operations: {
            submit: {
                type: 'button',
                label: '提交',
                props: {
                    type: 'primary'
                }
            },
            cancel: {
                type: 'button',
                label: '取消'
            }
        },
        events: {
            submit: '@validate @confirm:确认提交吗? @update'
        },
        actions: {
            cancel() {
                this.$message.success('取消成功')
            },
            update() {
                this.$message.success('提交成功')
            }
        }
    },
    formData: {
        type: 'form',
        resource: {
            fields: {
                text: {
                    label: '新文本1',
                    type: 'text',
                    default: '我是resource里定义的默认值'
                },
                text2: {
                    label: '新文本2',
                    type: 'text',
                    dafault: '我是resource里定义的默认值'
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
        data: {
            text2: '我是data里定义的默认值',
            date: 1539792000000
        }
    },
    formLayout: {
        type: 'form',
        resource: {
            fields: {
                text: {
                    label: '新文本1',
                    type: 'text',
                    default: '我是resource里定义的默认值',
                    props: {
                        inline: true
                    }
                },
                text2: {
                    label: '新文本2',
                    type: 'text',
                    dafault: '我是resource里定义的默认值',
                    props: {
                        inline: true
                    }
                },
                date: {
                    type: 'date',
                    label: '日期'
                },
                select: {
                    type: 'select',
                    label: '选项',
                    props: {
                        inline: true,
                        options: {
                            vip: '唯品会',
                            jd: '京东'
                        }
                    }
                },
                password: {
                    type: 'password',
                    label: '密码',
                    props: {
                        inline: true,
                        formItemWidth: '60%',
                    }
                }
            }
        },
        ctx: 'edit',
        data: {
            text2: '我是data里定义的默认值',
            date: 1539792000000
        }
        // layout: {
        //     text: ['text', 'text2']
        //     // testDatetime: 'testDatetime'
        // }
    },
    formInline: {
        type: 'form',
        resource: {
            fields: {
                text: {
                    label: '新文本1',
                    type: 'text',
                    default: '我是resource里定义的默认值'
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
        props: {
            inline: true
        }
    },
    formViewAll: {
        type: 'form',
        resource: 'form',
        ctx: 'view',
        resource: {
            fields: {
                text: {
                    label: '文本',
                    type: 'text'
                },
                date: {
                    type: 'switch',
                    label: '开关'
                },
                textarea: {
                    type: 'textarea',
                    label: '内容'
                },
                color: {
                    type: 'color',
                    label: '颜色'
                },
                rate: {
                    type: 'rate',
                    label: '评分'
                },
                radio: {
                    type: 'radio',
                    label: '单选',
                    props: {
                        options: {
                            a: '黄金糕',
                            b: '双皮奶',
                            c: '蚵仔煎',
                            d: '龙须面',
                            e: '北京烤鸭'
                        }
                    }
                },
                checkbox: {
                    type: 'checkbox',
                    label: '多选',
                    props: {
                        options: {
                            a: '黄金糕',
                            b: '双皮奶',
                            c: '蚵仔煎',
                            d: '龙须面',
                            e: '北京烤鸭'
                        }
                    }
                }
            }
        },
        data: {
            text: "双11活动",
            switch: 1,
            textarea: "双11活动双11活动双11活动双11活动双11活动双11活动双11活动双11活动双11活动",
            color: "#f00",
            rate: 3.7,
            radio: "d",
            checkbox: "b,c"
        }, 
    },
    formSlot: {
        type: 'form',
        resource: {
            fields: {
                text: {
                    label: '文本',
                    type: 'text'
                },
                date: {
                    type: 'switch',
                    label: '开关'
                },
                textarea: {
                    type: 'textarea',
                    label: '内容'
                },
                color: {
                    type: 'color',
                    label: '颜色'
                },
                rate: {
                    type: 'rate',
                    label: '评分'
                }
            }
        },
        ctx: 'edit',
        events: {
            init: '@console',
            submit: '@validate @confirm:确认提交吗? @update'
        },
        actions: {
            fieldChange({ name, value }) {
                if (name === 'testSwitch') {
                    this.block.fields.testPassword.props.disabled = !value
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
            cancel: {
                type: 'button',
                label: '取消'
            }
        },
        blocks: {
            formSlotTitle: {
                type: 'title',
                options: {
                    title: '其它表单'
                },
                style: {
                    marginLeft: '50px'
                },
                slot: 'field:textarea'
            }
        }
    },
    formSlotTop: {
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
        blocks: {
            title1: {
                type: 'title',
                options: {
                    title: '主标题'
                },
                slot: 'top'
            }
        }
    },
    enterForm: {
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
        on: {
            'keyupEnter': function(args) {
                console.log('keyup.enter.native', this, args);
                alert('你触发enter了')
            }
        },
    }
}
