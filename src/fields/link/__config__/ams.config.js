export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'link'
    },
    props: {
        current: 'value',
        fields: {
            value: {
                default: {
                    href: 'https://www.baidu.com',
                    target: '_blank',
                    type: 'primary'
                }
            }
        }
    }
};

export const defaults = {};
