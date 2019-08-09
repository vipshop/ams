export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'checkbox'
    },
    default: {
        type: 'text',
        default: 'a,c',
        props: {
            placeholder: '默认值：多个值由,分隔'
        }
    },
    collapseLimit: {
        type: 'inputnumber',
        info: `可以设置在view状态下，如果超出一定数量可以折叠，不配置或0为不折叠`,
        label: `显示折叠`,
        default: 0
    },
    useStringValue: {
        type: 'union',
        current: 'none',
        label: 'string转换',
        info: `默认为true，会自动转换多选options内的value为string，如设置为false不转换（需要重置set和get配合）`,
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'switch',
                label: '配置',
                default: 1
            }
        }
    },
    props: {
        current: 'object',
        fields: {
            none: null,
            value: null,
            object: {
                type: 'ams-code',
                label: 'object',
                valueType: 'object',
                default: {
                    options: {
                        a: '黄金糕',
                        b: '双皮奶',
                        c: '蚵仔煎'
                    }
                }
            },
            array: {
                type: 'ams-code',
                label: 'array',
                valueType: 'object',
                default: {
                    options: [{
                        label: '黄金糕',
                        value: 'a'
                    }, {
                        label: '双皮奶',
                        value: 'b'
                    }, {
                        label: '蚵仔煎',
                        value: 'c',
                        disabled: true
                    }]
                }
            }
        }
    }
};

export const defaults = {};
