import ams from '@ams-team/ams';

ams.block('popconfirm', {
    blocks: {
        popconfirm1Title: {
            type: 'title',
            options: {
                title: '基础用法'
            }
        },
        popconfirm1Block: {
            type: 'popconfirm',
            props: {
                title: '标题1'
            },
            slots: {
                content: '弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容',
                reference: 'click激活'
            },
            on: {
                confirm() {
                    console.log('confirm');
                },
                cancel() {
                    console.log('cancel');
                }
            }
        }
    }
});
