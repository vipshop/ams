export default {
    defaultComponent: {
        type: 'component',
        options: {
            is: 'img'
        },
        style: {
            width: '200px',
            height: '200px'
        },
        props: {
            src: '//b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
        }
    },
    divComponent: {
        type: 'component',
        options: {
            is: 'div',
            text: "我是插进来的TEXT内容",
            html: '<h3>我是插进来的HTML内容</h3>'
        }
    },
    divElComponent: {
        type: 'component',
        options: {
            is: 'div'
        },
        style: {
            padding: '100px'
        },
        operations: {
            test: {
                type: 'button',
                label: '提交'
            }
        },
        actions: {
            test() { 
                this.$message('你点击了提交按钮');
            }
        },
        blocks: {
            testBlockComponent: {
                type: 'component',
                options: {
                    is: 'el-rate'
                },
                props: {
                    value: 4
                }
            }
        }
    }
}
