import ams from '@ams-team/ams';

ams.block('collapse', {
    type: 'collapse',
    style: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '5%'
    },
    props: {
        accordion: false
    },
    options: {
        collapseblock1: `一致性 <i class="header-icon el-icon-info"></i>`,
        collapseblock2: '反馈'
    },
    data: {
        active: 'collapseblock2'
    },
    blocks: {
        collapseblock1: {
            blocks: {
                collapseblock11: {
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
        collapseblock2: {
            blocks: {
                collapseblock12: {
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
