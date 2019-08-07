export const config = {
    BASE: 'CONFIG_OPERATION',
    type: {
        default: 'field'
    },
    label: {
        default: '字段'
    },
    event: {
        props: {
            disabled: true,
            placeholder: 'field类型无效'
        }
    },
    field: {
        type: 'union',
        current: 'string',
        label: 'field配置',
        info: 'field配置，string形式会引用当前block的resource的同名field，或者通过object指定具体的field',
        fields: {
            string: {
                type: 'text',
                label: 'text',
                default: 'name'
            },
            object: {
                type: 'ams-code',
                label: 'object',
                valueType: 'object',
                default: {
                    type: 'rate',
                }
            }
        }
    },
};

export const defaults = {};
