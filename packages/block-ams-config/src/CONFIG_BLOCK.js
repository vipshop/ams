export default {
    type: {
        type: 'text',
        label: '类型',
        rules: [{
            required: true
        }],
        ctx: 'view',
        info: 'block类型'
    },
    data: {
        type: 'union',
        current: 'none',
        label: '初始数据',
        info: 'data可以指定当前block的初始数据，结构和fields保持一致',
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
    config: {
        type: 'union',
        current: 'none',
        label: '全局配置',
        info: '全局配置，和通过ams.config配置效果一致',
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
    style: {
        type: 'union',
        current: 'none',
        label: '样式配置',
        info: '可以设置区块的外层样式',
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
    events: {
        type: 'union',
        current: 'none',
        label: 'event配置',
        info: `可以配置对应事件的处理actions`,
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
    actions: {
        type: 'union',
        current: 'none',
        label: 'action配置',
        info: `可以配置具体的action处理函数`,
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
    operations: {
        type: 'union',
        current: 'value',
        label: '操作配置',
        info: `可以配置operation操作`,
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {
                    button: {
                        type: 'button',
                        label: '按钮1'
                    }
                }
            }
        }
    },
    blocks: {
        type: 'union',
        current: 'value',
        label: '子blocks',
        info: `可以配置多个子block`,
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {
                    subBlock: {
                        type: 'component',
                        options: {
                            is: 'div',
                            text: '子block示例'
                        },
                        style: {
                            border: '1px solid #E4E7ED',
                            padding: '10px'
                        }
                    }
                }
            }
        }
    },
    render: {
        type: 'union',
        label: '渲染目标',
        current: 'switch',
        info: '默认为false，配置为true则自动在body内渲染，如传入string则渲染在指定的querySelector上',
        fields: {
            switch: {
                type: 'switch',
                label: 'switch',
                // default: false,
                props: {
                    'active-value': true,
                    'inactive-value': false
                }
            },
            string: {
                type: 'text',
                label: 'string',
                default: '',
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
    options: {
        type: 'union',
        current: 'none',
        label: 'option配置',
        info: 'block特有配置',
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
    /**
     * type
     * resource
     * data
     * ctx
     * props
     * options
     * config
     * fields
     * style
     * events
     * actions
     * operations
     * blocks
     * render
     */

    /**
      * pageSize
      * filters
      * sorts
      */

    /**
      * router
      */
};
