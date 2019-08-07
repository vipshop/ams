export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'audio'
    },
    default: {
        type: 'text',
        default: 'https://a.vpimg2.com/upload/upimg2/i/9b0e909ed263b25c.mp3',
        props: {
            placeholder: '可以设置默认值'
        }
    },
    successUrlKey: {
        type: 'text',
        label: 'url字段名',
        info: '调用action上传接口成功后会通过该路径去获取url值',
        default: 'url'
    },
    tip: {
        type: 'text',
        label: '上传提示',
        info: '固定显示的tip',
        default: '',
        props: {
            placeholder: '固定显示的tip'
        }
    },
    props: {
        current: 'value',
        info: 'action为上传接口地址',
        fields: {
            value: {
                default: {
                    action: 'https://上传接口地址'
                }
            }
        }
    }
};

export const defaults = {};
