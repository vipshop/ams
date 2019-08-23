export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'arraylist'
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
            a: { type: 'color', label: 'a' },
            b: { type: 'text', label: 'b' }
        }
    },
    default: {
        type: 'ams-code',
        valueType: 'object',
        default: [{ a: '#f00', b: 'text' }, { a: '#0f0', b: 'te2xt' }]
    },
};

export const defaults = {};
