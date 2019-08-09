export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'radio'
    },
    default: {
        type: 'text',
        default: 'a',
        props: {
            placeholder: '默认值'
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
