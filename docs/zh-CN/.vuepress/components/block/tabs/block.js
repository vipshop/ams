export default {
    defaultTabs: {
        type: 'tabs',
        options: {
        tab1: 'tab1',
        tab2: 'tab2'
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '100px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '100px',
                }
            }
        },
        operations: {
            hide: {
                type: 'icon',
                label: '关闭',
                props: {
                    class: 'el-icon-close'
                }
            }
        }
    }
}
