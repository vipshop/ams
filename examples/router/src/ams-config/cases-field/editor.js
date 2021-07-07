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
                testEditor1: {
                    type: 'editor',
                    label: '富文本',
                    on: {
                        blur($event) {
                            console.log('onEditorBlur');
                        },
                        focus($event) {
                            console.log('onEditorFocus');
                        },
                        ready($event) {
                            console.log('onEditorReady');
                        }
                    }
                },
                testEditor2: {
                    type: 'editor',
                    label: '富文本自定义配置',
                    props: {
                        options: {
                            placeholder: '自定义 placeholder',
                            modules: {
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike']
                                ]
                            }
                        }
                    }
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
