export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'image'
    },
    default: {
        type: 'text',
        default: 'http://b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png',
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
    },
    check: {
        type: 'union',
        current: 'none',
        label: '图片校验',
        info: '可以配置图片校验参数，先进行本地校验，符合条件的才上传',
        fields: {
            BASE: 'CONFIG_NONE',
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {
                    maxSizeInKB: null,
                    imgMaxWidth: null,
                    imgMaxHeight: null,
                    imgMinWidth: null,
                    imgMinHeight: null,
                    imgWidth: null,
                    imgHeight: null
                }
            }
        }
    },
};

export const defaults = {};
