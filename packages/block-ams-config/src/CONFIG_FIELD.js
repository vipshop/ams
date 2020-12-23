export default {
    type: {
        type: 'text',
        label: '类型',
        rules: [{
            required: true
        }],
        ctx: 'view',
        info: 'field类型'
    },
    label: {
        type: 'text',
        label: '标签',
        props: {
            placeholder: '如：文本'
        },
        default: '字段',
        info: '标签文本'
    },
    ctx: {
        type: 'radio',
        props: {
            options: {
                edit: '编辑',
                view: '展示'
            },
        },
        default: 'edit',
        label: '状态',
        info: '编辑态为edit，展示态为view，不配置则使用当前block的ctx'
    },
    default: {
        type: 'union',
        info: `可以设置默认值`,
        label: `默认值`,
        current: 'string',
        fields: {
            string: {
                type: 'text',
                label: 'string',
                props: {
                    placeholder: '如：1'
                },
                default: '1'
            },
            number: {
                type: 'inputnumber',
                label: 'number',
                default: 1
            }
        }
    },
    labelWidth: {
        type: 'text',
        label: '标签宽度',
        props: {
            placeholder: '如：130px'
        },
        info: '在form和object内生效，可单独指定当前field的标签文本所占的宽度'
    },
    info: {
        type: 'text',
        label: 'tip信息',
        props: {
            placeholder: '提示信息tooltip'
        },
        info: '如配置会在标签处展示tooltip提示'
    },
    desc: {
        type: 'text',
        label: '提示信息',
        props: {
            placeholder: '显示在表单项下面'
        },
        info: '如配置会在ctx为edit状态下固定显示在表单项下面'
    },
    hidden: {
        type: 'union',
        current: 'none',
        label: '是否隐藏',
        info: `默认为false，配置为true则改表单项会隐藏`,
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'switch',
                label: '配置',
                default: 0,
            }
        }
    },
    show: {
        type: 'union',
        label: '联动显示',
        current: 'string',
        info: '配置后只有满足指定的条件后才显示，实现对目标条件的依赖联动',
        fields: {
            string: {
                type: 'text',
                label: 'string',
                props: {
                    placeholder: '如：a.b'
                },
                info: `可以指定要依赖的联动字段，如目标字段有值则显示，如：'a','a.b'`
            },
            object: {
                type: 'object',
                label: 'object',
                info: `可以指定要依赖的联动字段，如目标字段的值为value则显示`,
                fields: {
                    name: {
                        labelWidth: '70px',
                        type: 'text',
                        label: 'name',
                        props: {
                            placeholder: '如：a.b'
                        },
                        info: `目标字段名`,
                    },
                    value: {
                        type: 'union',
                        labelWidth: '70px',
                        info: `目标字段值`,
                        label: `value`,
                        current: 'string',
                        fields: {
                            string: {
                                type: 'text',
                                label: 'string',
                                props: {
                                    placeholder: '如：1'
                                },
                            },
                            number: {
                                type: 'inputnumber',
                                label: 'number'
                            }
                        }
                    }
                }
            },
            function: {
                type: 'ams-code',
                label: 'function',
                valueType: 'function',
                // on: {
                //     change(val) { console.log('change', val) },
                //     blur(val) { console.log('blur', val) },
                // },
                default: function (data) {
                    return true;
                }
            }
        }
    },
    rules: {
        type: 'union',
        current: 'none',
        label: '校验规则',
        info: `可以配置多条校验规则，会在form的编辑态通过@validate来校验，详见 https://github.com/yiminghe/async-validator`,
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'array',
                label: '配置',
                field: {
                    type: 'object',
                    label: '规则',
                    fields: {
                        require: {
                            type: 'switch',
                            label: '是否必填',
                            info: `是否必填`
                        },
                        type: {
                            type: 'select',
                            label: '校验类型',
                            info: `校验类型`,
                            props: {
                                multiple: false,
                                options: {
                                    'string': 'string 字符串',
                                    'number': 'number 数值',
                                    'boolean': 'boolean 布尔值',
                                    'method': 'method 方法',
                                    'regexp': 'regexp 正则',
                                    'integer': 'integer 整数',
                                    'float': 'float 浮点数',
                                    'array': 'array 数组',
                                    'object': 'object 对象',
                                    'enum': 'enum 枚举',
                                    'date': 'date 日期',
                                    'url': 'url 地址',
                                    'hex': 'hex 十六进制',
                                    'email': 'email 邮件',
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    props: {
        type: 'union',
        current: 'none',
        label: 'props属性',
        info: '会透传至底层的element-ui组件作为props属性，或者是原生dom元素的属性',
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {}
            }
        }
    },
    changeConfig: {
        type: 'ams-code',
        label: 'changeConfig',
        valueType: 'function',
        info: '对字段的处理，参数field代表字段配置，context代表当前行数据',
        default: function (field, context) {
            if (context.id === 1) {
                field.style = {
                    color: '#409EFF'
                };
            }
            return field;
        }
    }
    /**
     * type
     * label
     * ctx
     * default
     * labelWidth
     * info
     * hidden
     * show
     * rules
     *
     * props
     *
     * get
     * set
     * view
     * equals?
     */
};
