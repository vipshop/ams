import ams from '@ams-team/ams';

ams.block('backtop', {
    type: 'form',
    resource: 'resource',
    ctx: 'edit',

    events: {
        init: '@read:2'
    },

    style: {
        height: 'calc(100vh - 104px)',
        overflowY: 'scroll'
    },

    blocks: {
        backtopTitle: {
            type: 'title',
            options: {
                title: '回到顶部',
                subTitle: '滑到表单底部可预览「回到顶部」demo'
            },
            slot: 'top'
        },
        backtopBase: {
            type: 'backtop',
            props: {
                target: '.ams-block-form',
                bottom: 50
            }
        },
        backtopCustom: {
            type: 'backtop',
            props: {
                target: '.ams-block-form',
                bottom: 100
            },
            blocks: {
                backtopCustomContent: {
                    type: 'component',
                    options: {
                        text: 'UP'
                    },
                    style: {
                        color: '#1989fa',
                        'text-align': 'center',
                        'line-height': '40px'
                    }
                }
            }
        }
    }
});
