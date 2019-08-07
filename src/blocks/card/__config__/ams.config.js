export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'card'
    },
    blocks: {
        desc: '可用slot：header'
    },
    options: {
        current: 'value',
        fields: {
            value: {
                default: {
                    style: {},
                    headerTitle: '可选标题'
                }
            }
        }
    },
};

export const defaults = {};
