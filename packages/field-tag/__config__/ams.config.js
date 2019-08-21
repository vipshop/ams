export const config = {
    BASE: 'CONFIG_FIELD',
    type: {
        default: 'tag'
    },
    default: {
        type: 'ams-code',
        valueType: 'js',
        default: [
            { id: 2002, name: 'aaaa.ccc.name', subName: '' },
            { id: 2003, name: '组货分类（场景类型）', subName: '' }
        ]
    },
    props: {
        current: 'value',
        fields: {
            value: {
                default: {
                    placeholder: '请输入标签',
                    action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
                    successCode: 200,
                }
            }
        }
    }
};

export const defaults = {};
