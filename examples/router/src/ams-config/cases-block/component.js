import ams from '@ams-team/ams';

ams.block('component', {
    data: {
        selectView: 'aaaa.bbb',
        selectEdit: 'aaaa.bbb'
    },
    blocks: {
        componentDiv: {
            type: 'component',
            options: {
                is: 'div'
            },
            style: {
                padding: '100px',
                backgroundColor: '#eee'
            },
            operations: {
                test: {
                    type: 'button',
                    label: 'test'
                }
            },
            actions: {
                init() {
                    console.log('init');
                },
                test() { console.log('test') }
            },
            blocks: {
                formInDiv: {
                    type: 'form',
                    resource: 'resource',
                    ctx: 'edit',
                    style: {
                        backgroundColor: '#fff'
                    },
                    operations: {
                        submit: {
                            type: 'button',
                            label: '更新',
                            event: 'submit',
                            props: {
                                type: 'primary'
                            }
                        }
                    },

                    events: {
                        init: '@read',
                        submit: '@update'
                    }
                },
                testBlockComponent: {
                    type: 'component',
                    options: {
                        is: 'ams-block'
                    },
                    props: {
                        name: 'remote-select'
                    }
                }
            }
        },
        componentImage: {
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
});
