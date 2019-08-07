export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'dialog'
    },
    data: {
        current: 'value',
        fields: {
            value: {
                default: {
                    title: 'dialog标题',
                    visible: true,
                }
            }
        }
    }
};

export const defaults = {};
