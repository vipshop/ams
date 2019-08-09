const blockConfig = {
    blocks: {
        div: {
            type: 'component',
            options: {
                is: 'div'
            },
            style: {
                padding: '100px',
                backgroundColor: '#007'
            },
            operations: {
                test: {
                    type: 'button',
                    label: 'test'
                }
            },
            actions: {
                test() { console.log('test') }
            },
            blocks: {
                testBlockComponent: {
                    type: 'component',
                    options: {
                        is: 'el-rate'
                    },
                    style: {
                        backgroundColor: '#fff'
                    },
                    props: {
                        value: 4
                    }
                }
            }
        },
        image: {
            type: 'component',
            options: {
                is: 'img'
            },
            style: {
                width: '100px',
                height: '100px',
                backgroundColor: '#007'
            },
            props: {
                src: '//b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
            }
        }
    }
}

export default blockConfig
