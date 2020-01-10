import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('editor', {
    resources: {
        'resource-editor': {
            api: {
                prefix: prefix,
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
            ctx: 'edit',
            type: 'form',
            resource: 'resource-editor', // 此处的resource能否去掉？
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
            ctx: 'view',
            type: 'form',
            // 指定block使用的资源为上面声明的demo-res
            resource: 'resource-editor',
            events: {
                init: '@read'
            },
            actions: {}
        }
    }
});
