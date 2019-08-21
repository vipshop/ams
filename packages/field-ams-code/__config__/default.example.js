const functionValue = `function () {
    console.log(this, 'hahah')
}`;
const objectValue = `{
    type: 'text',
    label: '标签',
    props: {
        placeholder: '如：文本'
    },
    default: '字段',
    info: '标签文本'
}`;
const jsValue = function (val) {
    return val;
};

export default {
    resources: {
        res: {
            fields: {
                id: {
                    type: 'text',
                    label: 'id',
                    hidden: true
                },
                functionValue: {
                    type: 'ams-code',
                    label: 'function',
                    style: {
                        width: '300px'
                    },
                    codeMirrorOptions: {
                        styleActiveLine: false
                    }
                    // on: {
                    //     blur() { console.log('blur', this) },
                    //     change() { console.log('change', this) },
                    // },
                },
                objectValue: {
                    type: 'ams-code',
                    label: 'object'
                },
                jsValue: {
                    type: 'ams-code',
                    label: 'js',
                    valueType: 'js'
                }
            }
        }
    },
    blocks: {
        funFormEdit: {
            type: 'form',
            ctx: 'edit',

            resource: 'res',

            data: {
                functionValue,
                objectValue,
                jsValue,
            },

            style: {
                width: '50%'
            },

            operations: {
                create: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            }
        },
        funFormView: {
            type: 'form',
            ctx: 'view',

            data: {
                functionValue,
                objectValue,
                jsValue,
            },

            resource: 'res',

            style: {
                width: '50%'
            }
        }
    }
};
