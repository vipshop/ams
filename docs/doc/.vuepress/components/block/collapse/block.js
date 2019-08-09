const blockConfig = {
    type: 'collapse',
    style: {
        width: '60%',
        marginLeft: '20%'
    },
    props: {
        accordion: false
    },
    options: {
        'block1': `一致性 <i class="header-icon el-icon-info"></i>`,
        'block2': '反馈'
    },
    blocks: {
        block1: {
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
        },
        block2: {
            blocks: {
                block21: {
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
                },
                block22: {
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
    }
}

export default blockConfig
