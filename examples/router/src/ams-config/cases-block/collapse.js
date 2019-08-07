import ams from '@ams-team/ams';

ams.block('collapse', {
    type: 'collapse',
    style: {
        width: '30%',
        marginLeft: '25%',
        paddingTop: '25%'
    },
    props: {
        accordion: false
    },
    options: {
        'block1': `一致性 <i class="header-icon el-icon-info"></i>`,
        'block2': '反馈'
    },
    blocks: {
        'block1': {
            blocks: {
                'block11': {
                    type: 'form',
                    resource: 'resource',
                    ctx: 'edit',
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
                    fields: {
                        id: {
                            style: {
                                width: '200px'
                            }
                        }
                    },
                    events: {
                        init: '@read',
                        submit: '@update'
                    }
                }
            }
        },
        block2: {
            blocks: {
                'block12': {
                    type: 'form',
                    resource: 'resource',
                    ctx: 'edit',
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
                    fields: {
                        id: {
                            style: {
                                width: '200px'
                            }
                        }
                    },
                    events: {
                        init: '@read',
                        submit: '@update'
                    }
                }
            }
        }
    }
});
