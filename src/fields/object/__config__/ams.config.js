export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'object'
    },
    fields: {
        type: 'ams-code',
        label: 'field配置',
        info: '对象元素的field配置，可以包含任意field',
        valueType: 'object',
        // on: {
        //     change(val) { console.log('change', val) },
        //     blur(val) { console.log('blur', val) },
        // },
        default: {
            a: { type: 'color', label: 'a', default: '#f00' },
            b: { type: 'text', label: 'b', default: 'text' }
        }
    },
    default: {
        type: 'ams-code',
        valueType: 'object',
        default: { a: '#f00', b: 'text' }
    },
    layout: {
        type: 'union',
        current: 'none',
        label: 'layout配置',
        info: `可以重定义field的布局，如合并多个field在同一行，如{ a: ['a', 'b']}`,
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
};

export const defaults = {};
