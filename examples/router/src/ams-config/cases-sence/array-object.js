import ams from '@ams-team/ams';

ams.block('array-object', {
    resources: {
        arrayObject: {
            api: {
                successCode: 200,
                // api前缀
                prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
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
                            desc: `只能上传jpg/png文件，且不超过500kb`,
                            props: {
                                clearable: false
                            },
                            labelWidth: '100px',
                            info: '<p>info</p>1',
                            changeConfig(field, context) {
                                console.log(field, context);
                                return field;
                            }
                        },
                        date: {
                            type: 'date',
                            label: 'date',
                            labelWidth: '100px'
                        }
                    },
                    props: {
                        align: 'left',
                        'header-align': 'center'
                    },
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
                            type: 'array',
                            label: 'ArrayArray',
                            field: {
                                type: 'array',
                                label: 'array',
                                field: {
                                    type: 'text',
                                    label: 'text'
                                }
                            }
                        },
                        ArrayObject: {
                            type: 'array',
                            label: 'ArrayObject',
                            field: {
                                type: 'object',
                                label: 'object',
                                fields: {
                                    text: {
                                        type: 'text',
                                        label: 'text',
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
                                    'selectA': {
                                        'type': 'select',
                                        'label': '对比',
                                        'props': {
                                            'multiple': false,
                                            'options': {
                                                '0': '昨天',
                                                '1': '今天',
                                                '5': '不对比'
                                            }
                                        }
                                    },
                                    'selectB': {
                                        'type': 'select',
                                        'label': '条件',
                                        'props': {
                                            'multiple': false,
                                            'options': {
                                                '0': '同比下降',
                                                '1': '同比上升'
                                            }
                                        },
                                        changeConfig(field, context) {
                                            console.log(field, context);
                                            if (context && context.selectA === '5') {
                                                field.props.options = {
                                                    '>': '>',
                                                    '>=': '>='
                                                };
                                            }
                                            !field.props.options[context.selectB] && (context.selectB = '');
                                            return field;
                                        }
                                    },
                                    date: {
                                        type: 'date',
                                        label: 'date'
                                    }
                                }
                            }
                        }
                    }
                },
                simpleArray: {
                    type: 'array',
                    desc: `只能上传jpg/png文件，且不超过500kb`,
                    label: 'simpleArray',
                    field: {
                        type: 'text',
                        label: 'text'
                    }
                },
                ArrayArray: {
                    type: 'array',
                    label: 'ArrayArray',
                    field: {
                        type: 'array',
                        label: 'array',
                        field: {
                            type: 'text',
                            label: 'text'
                        }
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
});

