export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'steps'
    },
    blocks: {
        fields: {
            value: {
                default: {
                    subBlock1: {
                        type: 'component',
                        options: {
                            is: 'div',
                            text: '子block示例2'
                        },
                        style: {
                            border: '1px solid #E4E7ED'
                        }
                    },
                }
            }
        }
    },
    data: {
        current: 'value',
        fields: {
            value: {
                default: {
                    active: 0
                }
            }
        }
    },
    options: {
        current: 'value',
        fields: {
            value: {
                default: {
                    subBlock: '标题1',
                    subBlock1: '标题2'
                }
            }
        }
    },
    actions: {
        current: 'value',
        fields: {
            value: {
                default: {
                    next() {
                        this.data.active = (this.data.active + 1) % this.block.blocks.length;
                    }
                }
            }
        }
    },
    operations: {
        fields: {
            value: {
                type: 'ams-code',
                label: '配置',
                valueType: 'object',
                default: {
                    button: {
                        label: '下一步',
                        event: 'next'
                    }
                }
            }
        }
    },
};

export const defaults = {};
