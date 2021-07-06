import ams from '@ams-team/ams';

ams.block('popover', {
    blocks: {
        popover1Title: {
            type: 'title',
            options: {
                title: '基础用法'
            }
        },
        popover1Block: {
            type: 'popover',
            props: {
                title: '标题1'
            },
            slots: {
                content: '弹出框内容弹出框内容弹出框内容弹出框内容弹出框内容',
                reference: 'hover激活'
            }
        },
        popover2Title: {
            type: 'title',
            options: {
                title: '弹出框中使用html'
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
        popover3Title: {
            type: 'title',
            options: {
                title: '弹出框中使用html'
            }
        },
        popover3Block: {
            type: 'popover',
            props: {
                title: '标题2'
            },
            slots: {
                content: '这是一段<span style="color: red">内容</span>,这是一段内容,这是一段内容,这是一段内容。',
                reference: '字段说明<i class="el-icon-question"></i>'
            }
        },
        popover4Title: {
            type: 'title',
            options: {
                title: '弹出框中使用block'
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
        // popover4Title: {
        //     type: 'title',
        //     options: {
        //         title: '内容和弹出框都使用block'
        //     }
        // }
        // popover4Block: {
        //     type: 'popover',
        //     props: {
        //         title: '标题3',

        //     },
        //     blocks: {
        //         popoverButton4: {
        //             slot: 'reference',
        //             type: 'component',
        //             options: {
        //                 is: 'div',
        //                 trigger: 'hover'
        //             },
        //             operations: {
        //                 test: {
        //                     type: 'button',
        //                     label: 'hover'
        //                 }
        //             }
        //         },
        //         popoverList4: {
        //             slot: 'content',
        //             type: 'card',
        //             style: {
        //                 width: '600px',
        //                 margin: '20px auto'
        //             },
        //             options: {
        //                 headerTitle: '卡片标题'
        //             },
        //             blocks: {
        //                 emptyCardText4: {
        //                     type: 'component',
        //                     options: {
        //                         is: 'div',
        //                         text: '我是自定义内容！我是自定义内容！我是自定义内容'
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
});
