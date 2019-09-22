import ams from '@ams-team/ams';

ams.block('input', {
    resources: {
        input: {
            fields: {
                text1: {
                    label: 'text1text1text1text1text1',
                    type: 'text'
                },
                text2: {
                    label: 'text2',
                    type: 'text',
                    slots: {
                        prefix: '输入'
                    },
                    props: {
                        class: 'is-required' // 样式名
                    }
                },
                text3: {
                    label: 'text2',
                    type: 'text',
                    slots: {
                        suffix: '输入框尾部内容'
                    },
                    // props: {
                    //     inline: true
                    // }
                },
                text4: {
                    label: 'text3',
                    type: 'text',
                    slots: {
                        prepend: 'Http://'
                    }
                },
                text5: {
                    label: 'text4',
                    type: 'text',
                    slots: {
                        append: '.com'
                    }
                }
            }
        }
    },
    blocks: {
        editInput: {
            // data: datas,
            type: 'form',
            resource: 'input',
            ctx: 'edit',
            style: {
                width: '50%'
            }
        }
    }
});
