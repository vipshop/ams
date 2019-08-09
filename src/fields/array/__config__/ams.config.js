export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'array'
    },
    field: {
        type: 'ams-code',
        label: 'field配置',
        info: '数组元素的基础field配置',
        valueType: 'object',
        // on: {
        //     change(val) { console.log('change', val) },
        //     blur(val) { console.log('blur', val) },
        // },
        default: {
            type: 'text',
            label: '元素'
        }
    },
    default: {
        type: 'ams-code',
        valueType: 'object',
        default: ['1', '2']
    }
};

export const defaults = {};
