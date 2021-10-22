import ams from '@ams-team/ams';

ams.block('timeline', {
    blocks: {
        timeline1Title: {
            type: 'title',
            options: {
                title: '基础用法'
            }
        },
        timeline1Block: {
            type: 'timeline',
            props: {
                reverse: true
            },
            data: [{
                content: '活动按期开始，状态：<span class="el-tag el-tag--dark el-tag--mini el-tag--danger">异常<div>',
                timestamp: '2018-04-15'
            }, {
                content: '通过审核',
                timestamp: '2018-04-13'
            }, {
                content: '创建成功',
                timestamp: '2018-04-11'
            }],
            operations: {
                reverseSelect: {
                    slot: 'header',
                    type: 'field',
                    field: {
                        type: 'radio',
                        default: 1,
                        props: {
                            options: [
                                { label: '正叙', value: 1 },
                                { label: '倒叙', value: 0 }
                            ]
                        }
                    }
                }
            },
            actions: {
                fieldChange({ path, value }) {
                    if (path === 'header.reverseSelect') {
                        this.block.props.reverse = Boolean(value);
                    }
                }
            }
        },
        timeline2Title: {
            type: 'title',
            options: {
                title: '自定义节点'
            }
        },
        timeline2Block: {
            type: 'timeline',
            data: [{
                content: '支持使用图标',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
            }, {
                content: '支持自定义颜色',
                timestamp: '2018-04-03 20:46',
                color: '#0bbd87'
            }, {
                content: '支持自定义尺寸',
                timestamp: '2018-04-03 20:46',
                size: 'large'
            }, {
                content: '默认样式的节点',
                timestamp: '2018-04-03 20:46'
            }]
        }
    }
});