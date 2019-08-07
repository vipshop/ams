export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'transfer'
    },
    default: {
        type: 'text',
        default: '',
        props: {
            placeholder: '默认值：多个值由,分隔'
        }
    },
    props: {
        current: 'value',
        fields: {
            value: {
                default: {
                    options: [
                        {
                            value: 'a',
                            label: '黄金糕'
                        },
                        {
                            value: 'b',
                            label: '双皮奶'
                        },
                        {
                            value: 'c',
                            label: '蚵仔煎'
                        },
                        {
                            value: 'd',
                            label: '龙须面'
                        },
                        {
                            value: 'e',
                            label: '北京烤鸭'
                        }
                    ]
                }
            }
        }
    }
};

export const defaults = {};
