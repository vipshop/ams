import ams from '@ams-team/ams';
let id = 3;
ams.block('collapse', {
    type: 'collapse',
    style: {
        width: '80%',
        margin: '0 auto',
        paddingTop: '5%'
    },
    props: {
        accordion: true
    },
    options: {
        collapseblock1: {
            title: `一致性 <i class="header-icon el-icon-info"></i>`,
            lazy: true
        },
        collapseblock2: '反馈'
    },
    data: {
        active: ['collapseblock2']
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
                        // init: '@read',
                        submit: '@update'
                    },
                    actions: {
                        init() {
                            console.log('collapseblock1-init');
                        }
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
    },
    operations: {
        add: {
            type: 'button',
            label: '动态添加collapse',
            props: {
                type: 'primary'
            },
            style: {
                marginTop: '10px'
            }
        }
    },
    actions: {
        add() {
            const blockId = `collapseblock${id++}`;

            ams.block(blockId, {
                type: 'component',
                options: {
                    text: blockId
                },
                actions: {
                    init() {
                        console.log(`${blockId}-init`);
                    }
                }
            });
            this.block.blocks.push(blockId);

            this.block.options[blockId] = {
                title: blockId,
                lazy: true
            };

            this.data.active = blockId;
        }
    }
});
