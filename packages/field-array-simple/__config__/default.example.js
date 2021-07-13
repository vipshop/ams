export default {
    resources: {
        arrayObject: {
            api: {
                withCredentials: false,
                successCode: 200,
                // api前缀
                prefix: '//www.yournana.club/vipshop/',
                read: 'array-object-read',
                list: 'array-object-list'
            },
            fields: {
                simpleObject: {
                    type: 'object',
                    label: 'simple',
                    info: '<p>info</p>1',
                    fields: {
                        text: {
                            type: 'text',
                            label: 'rule2',
                            props: {
                                clearable: false
                            },
                            info: '<p>info</p>1'
                        },
                        date: {
                            type: 'date',
                            label: 'date'
                        }
                    }
                },
                mutiObject: {
                    type: 'object',
                    label: 'mutiObject',
                    fields: {
                        date: {
                            type: 'date',
                            label: 'date'
                        },
                        checkbox: {
                            type: 'checkbox',
                            label: 'checkbox',
                            props: {
                                options: {
                                    '1': '黄金糕',
                                    '2': '哈哈哈'
                                }
                            }
                        },
                        ArrayArray: {
                            type: 'array-simple',
                            label: 'ArrayArray',
                            field: {
                                type: 'array-simple',
                                label: 'array',
                                field: {
                                    type: 'text',
                                    label: 'text'
                                }
                            }
                        },
                        ArrayObject: {
                            type: 'array-simple',
                            label: 'ArrayObject',
                            field: {
                                type: 'object',
                                label: 'text',
                                fields: {
                                    text: {
                                        type: 'text',
                                        // label: 'text',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入活动名称',
                                                trigger: 'blur'
                                            },
                                            {
                                                min: 3,
                                                max: 5,
                                                message: '长度在 3 到 5 个字符',
                                                trigger: 'blur'
                                            }
                                        ]
                                    },
                                    testSelect: {
                                        type: 'select',
                                        // label: 'select多选',
                                        collapseLimit: true,
                                        props: {
                                            options: {
                                                a: '黄金糕',
                                                b: '双皮奶',
                                                c: '蚵仔煎',
                                                d: '龙须面',
                                                e: '北京烤鸭'
                                            }
                                        },
                                        style: {
                                            width: '500px'
                                        }
                                    }
                                },
                                layout: {
                                    text: ['text', 'testSelect']
                                }
                            }
                        }
                    }
                },
                simpleArray: {
                    type: 'array-simple',
                    label: 'simpleArray',
                    field: {
                        type: 'text',
                        label: ''
                    },
                    props: {
                        type: 'primary',
                        size: 'mini'
                    }
                },
                ArrayArray: {
                    type: 'array-simple',
                    label: 'ArrayArray',
                    field: {
                        type: 'array-simple',
                        label: 'array',
                        field: {
                            type: 'text',
                            label: 'text'
                        }
                    }
                },
                ArrayObject: {
                    type: 'array-simple',
                    label: 'ArrayObject',
                    field: {
                        type: 'object',
                        label: '',
                        fields: {
                            text: {
                                type: 'text',
                                // label: 'text',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入活动名称',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 3,
                                        max: 5,
                                        message: '长度在 3 到 5 个字符',
                                        trigger: 'blur'
                                    }
                                ]
                            },
                            testSelect: {
                                type: 'select',
                                // label: 'select多选',
                                collapseLimit: true,
                                props: {
                                    options: {
                                        a: '黄金糕',
                                        b: '双皮奶',
                                        c: '蚵仔煎',
                                        d: '龙须面',
                                        e: '北京烤鸭'
                                    }
                                },
                                style: {
                                    width: '500px'
                                }
                            }
                        },
                        layout: {
                            text: ['text', 'testSelect']
                        },
                        deletFunc: function(index) {
                            this.value.splice(index, 1, {
                                ...this.value[index],
                                delet: 1
                            });
                        },
                        show: function(data) {
                            console.log('ArrayObject', data);
                            if (data.delet === 1) {
                                return false;
                            } else {
                                return true;
                            }
                        },
                        // show: {
                        //     name: 'text',
                        //     value: '234'
                        // }
                    }
                },
                checkbox: {
                    type: 'checkbox',
                    label: 'checkbox',
                    props: {
                        options: {
                            '1': '黄金糕',
                            '2': '哈哈哈'
                        }
                    }
                }
            }
        }
    },
    blocks: {
        arrayEdit: {
            type: 'form',
            resource: 'arrayObject',
            ctx: 'edit',
            events: {
                init: '@read',
                submit: '@validate @create'
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '提交'
                }
            },
            actions: {
                fieldChange({ path }) {
                    // console.log('fieldChange', path);
                    if (path.indexOf('testSelect') > 0) {
                        // bool = !bool;
                        // window.ams.bus.$emit('fieldArraySimple.hideOperation', {
                        //     hideAdd: true,
                        //     hideDel: false
                        // });
                    }

                }
            }
        },
        arrayView: {
            type: 'form',
            resource: 'arrayObject',
            ctx: 'view',
            events: {
                init: '@read',
            },
        },
        arrayList: {
            type: 'list',
            resource: 'arrayObject',
            ctx: 'view',
            events: {
                init: '@list'
            }
        }
    }
};
