const data = {
    testEditor: '<h1>标题</h1><p>ddddd</p>'
};
export default {
    resources: {
        'resource-editor': {
            fields: {
                testEditor: {
                    type: 'editor',
                    label: '富文本'
                }
            }
        }
    },
    blocks: {
        editorEdit: {
            type: 'form',
            data,
            resource: 'resource-editor', // 此处的resource能否去掉？
            ctx: 'edit',
            operations: {
                update: {
                    type: 'button',
                    label: '提交',
                    props: {
                        type: 'primary'
                    }
                }
            }
        },
        editorView: {
            type: 'form',
            ctx: 'view',
            data,

            // 指定block使用的资源为上面声明的demo-res
            resource: 'resource-editor',
            actions: {}
        }
    }
};
