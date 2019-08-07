import ams from '@ams-team/ams';

ams.block('editor', {
    resources: {
        'resource-editor': {
            api: {
                prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
                create: 'create',
                update: 'update',
                read: 'read',
                delete: 'delete',
                list: 'list'
            },
            fields: {
                testEditor: {
                    type: 'editor',
                    label: '富文本'
                },
                testMarkdown: {
                    type: 'markdown',
                    label: 'markdown'
                }
            }
        }
    },
    blocks: {
        editorEdit: {
            type: 'form',
            resource: 'resource-editor', // 此处的resource能否去掉？
            ctx: 'edit',
            events: {
                init: '@read'
            },
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

            // 指定block使用的资源为上面声明的demo-res
            resource: 'resource-editor',

            events: {
                init: '@read'
            },
            actions: {}
        }
    }
});
