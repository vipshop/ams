export default {
    defaultError: {
        type: 'error'
    },
    buttonError: {
        type: 'error',
        data: {
            title: '404',
            subtitle: 'Page not found'
        },
        operations: {
            goIndex: {
                type: 'button',
                label: '返回首页',
                props: {
                    type: 'danger',
                    size: 'medium',
                    round: true
                }
            }
        },
        actions: {
            goIndex() {
                this.$message('你点击了返回首页按钮')
            }
        }
    },
    slotTopError: {
        type: 'error',
        data: {
            title: '404',
            subtitle: 'Page not found'
        },
        operations: {
            goIndex: {
                type: 'button',
                label: '返回首页',
                props: {
                    type: 'danger',
                    size: 'medium',
                    round: true
                }
            }
        },
        actions: {
            goIndex() {
                this.$message('你点击了返回首页按钮')
            }
        },
        blocks: {
            backButton: {
                slot: 'top',
                type: 'component',
                style: {
                    'textAlign': 'center'
                },
                operations: {
                    goIndex: {
                        type: 'button',
                        label: '返回首页',
                        props: {
                            type: 'danger',
                            size: 'medium',
                            round: true
                        }
                    }
                },
                actions: {
                    goIndex() {
                        this.$message('你点击了返回首页按钮')
                    }
                }
            }
        }
    }
}
