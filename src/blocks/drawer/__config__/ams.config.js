export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'drawer'
    },
    data: {
        current: 'value',
        fields: {
            value: {
                default: {
                    title: 'drawer标题',
                    visible: true,
                }
            }
        }
    }
};

export const defaults = {};
