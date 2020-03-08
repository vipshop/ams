export default {
    popover1Block: {
        type: 'popover',
        props: {
            title: '标题1'
        },
        slots: {
            reference: 'hover激活',
            content: '弹出框内容'
        }
    },
    popover2Block: {
        type: 'popover',
        props: {
            title: '标题2',
            trigger: 'click'
        },
        slots: {
            content: '这是一段<span style="color: red">内容</span>,这是一段内容,这是一段内容,这是一段内容。',
            reference: 'click激活'
        }
    },
    popover3Block: {
        type: 'popover',
        props: {
            title: '标题2',
        },
        slots: {
            content: '这是一段<span style="color: red">内容</span>,这是一段内容,这是一段内容,这是一段内容。',
            reference: '字段说明<i class="el-icon-question"></i>'
        }
    },
    popover4Block: {
        type: 'popover',
        slots: {
            content: '这是一段<span style="color: red">内容</span>,这是一段内容,这是一段内容,这是一段内容。',
            reference: 'hover激活'
        },
        blocks: {
            popoverList: {
                slot: 'content',
                type: 'card',
                style: {
                    width: '600px',
                    margin: '20px auto'
                },
                options: {
                    headerTitle: '卡片标题'
                },
                blocks: {
                    emptyCardText: {
                        type: 'component',
                        options: {
                            is: 'div',
                            text: '我是自定义内容！我是自定义内容！我是自定义内容'
                        }
                    }
                }
            }
        }
    }
}