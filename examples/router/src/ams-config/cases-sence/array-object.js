import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('array-object', {
    resources: {
        arrayObject: {
            api: {
                successCode: 200,
                // api前缀
                prefix: prefix,
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
                            labelWidth: '100px',
                            props: {
                                clearable: false
                            },
                            info: '<p>info</p>1',
                            desc: `只能上传jpg/png文件，且不超过500kb`,
                            changeConfig(field, context) {
                                console.log(field, context);
                                return field;
                            }
                        },
                        date: {
                            type: 'date',
                            label: 'date',
                            labelWidth: '100px'
                        },
                        testButton: {
                            type: 'button',
                            label: '按钮',
                            labelWidth: '0',
                            props: {
                                size: 'medium',
                                type: 'primary'
                            },
                            tooltip: '提示信息',
                            badge: {
                                value: function(data) {
                                    console.log('data', data);
                                    return true;
                                }
                            },
                            event: 'submit2'
                        }
                    },
                    props: {
                        align: 'left',
                        'header-align': 'center'
                    }
                },
                mutiObject: {
                    type: 'object',
                    label: 'mutiObject',
                    class: 'is-required',
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
                            props: {
                                max: 5,
                                min: 1
                            },
                            field: {
                                type: 'array',
                                label: 'array',
                                field: {
                                    type: 'button',
                                    label: '按钮',
                                    // labelWidth: '0',
                                    props: {
                                        size: 'medium',
                                        type: 'primary'
                                    },
                                    tooltip: '提示信息',
                                    badge: {
                                        value: function(data) {
                                            console.log('array-data', data);
                                            return true;
                                        }
                                    },
                                    event: 'submit2'
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
                                    selectA: {
                                        type: 'select',
                                        label: '对比',
                                        props: {
                                            multiple: false,
                                            options: {
                                                '0': '昨天',
                                                '1': '今天',
                                                '5': '不对比'
                                            }
                                        }
                                    },
                                    selectB: {
                                        type: 'select',
                                        label: '条件',
                                        props: {
                                            multiple: false,
                                            options: {
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
                                    },
                                    testButton: {
                                        type: 'button',
                                        label: '按钮',
                                        labelWidth: '0',
                                        props: {
                                            // size: 'mini',
                                            type: 'primary'
                                        },
                                        tooltip: '提示信息',
                                        badge: {
                                            value: function(data) {
                                                console.log('ArrayObject-data', data);
                                                return true;
                                            }
                                        },
                                        event: 'submit2'
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
                    props: {
                        max: 5
                    },
                    field: {
                        type: 'text',
                        label: 'text',
                        on: {
                            click: function(ev, $field) {
                                console.log(this, ev, $field);
                            }
                        }
                    }
                },
                ArrayArray: {
                    type: 'array',
                    label: 'ArrayArray',
                    field: {
                        type: 'array',
                        label: 'array',
                        props: {
                            max: 3,
                            min: 2
                        },
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
            ctx: 'edit',
            type: 'form',
            resource: 'arrayObject',
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
                submit2({ $prevReturn }) {
                    console.log('button-field-submit', $prevReturn);
                }
            }
        },
        arrayView: {
            ctx: 'view',
            type: 'form',
            resource: 'arrayObject',
            events: {
                init: '@read'
            }
        },
        arrayList: {
            ctx: 'view',
            type: 'list',
            resource: 'arrayObject',
            events: {
                init: '@list'
            }
        }
    }
});

