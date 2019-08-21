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
                    href: 'https://vip.com',
                    target: '_blank',
                    type: 'primary'
                }
            }
        }
    }
};

export const defaults = {};
