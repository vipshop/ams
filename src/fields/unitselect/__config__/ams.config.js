export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'unitselect'
    },
    units: {
        type: 'ams-code',
        label: '单位',
        info: '可选择的单位',
        valueType: 'array',
        default: ['毫米', '厘米', '分米', '千米']
    },
    defaultUnit: {
        type: 'text',
        default: '分米',
        label: '默认单位',
        props: {
            placeholder: '默认单位'
        }
    },
    default: {
        type: 'text',
        default: '100分米',
        props: {
            placeholder: '默认值：可带具体单位或者不带'
        }
    },
};

export const defaults = {};
