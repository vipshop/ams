export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'union'
    },
    fields: {
        type: 'ams-code',
        label: 'field配置',
        info: 'union元素的field配置，可以包含任意field',
        valueType: 'object',
        default: {
            color: { type: 'color', label: 'color', default: '#00f' },
            text: { type: 'text', label: 'text', default: 'hello' }
        }
    },
    current: {
        type: 'text',
        default: 'color',
        label: '当前field名',
        props: {
            placeholder: '指定union当前生效的field，通过key名指定'
        }
    },
    default: {
        type: 'text',
        default: '#f00',
        props: {
            placeholder: '默认值'
        }
    },
};

export const defaults = {};
