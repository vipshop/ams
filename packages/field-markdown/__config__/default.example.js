const data = {
    testMarkdown: '# 标题'
};
export default {
    resources: {
        'res': {
            fields: {
                testMarkdown: {
                    type: 'markdown',
                    label: 'Markdown',
                    props: {
                        action: '//xxx.vip.com/api/upload',
                        xss: true,
                        // html: false, // 是否支持html输入
                        async imgAdd(pos, $file, editor) {
                            console.log(pos, $file, editor);
                        }
                    }
                }
            }
        }
    },
    blocks: {
        editorEdit: {
            type: 'form',
            data,
            resource: 'res', // 此处的resource能否去掉？
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
            resource: 'res'
        }
    }
};
