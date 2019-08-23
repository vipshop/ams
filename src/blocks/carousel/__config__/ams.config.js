export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'tabs'
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
                    active: 'subBlock'
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
};

export const defaults = {};
