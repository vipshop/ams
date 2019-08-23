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
        default: '按钮',
        info: '标签文本'
    },
    event: {
        type: 'text',
        label: '事件名',
        props: {
            placeholder: '如：test'
        },
        info: '点击按钮触发的事件名，如不提供则会使用operations内改对象的key作为事件名'
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
    /**
     * props
     * type
     * label
     * show
     */
};
