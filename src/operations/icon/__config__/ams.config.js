export const config = {
    BASE: 'CONFIG_OPERATION',
    label: {
        default: '图标'
    },
    type: {
        default: 'icon'
    },
    icon: {
        type: 'text',
        label: '图标名',
        default: 'el-icon-share',
        rules: [{
            required: true
        }],
        props: {
            placeholder: '可用图标名，请参考element的icon部分'
        }
    }
};

export const defaults = {};
