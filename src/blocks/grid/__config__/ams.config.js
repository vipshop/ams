export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'grid'
    },
    blocks: {
        fields: {
            value: {
                default: {
                    subBlock: {
                        type: 'card',
                        options: {
                            headerTitle: '卡片类型自带的标题'
                        },
                        blocks: {
                            emptyCardText: {
                                type: 'component',
                                options: {
                                    is: 'div',
                                    text: '这里是自定义内容'
                                }
                            }
                        }
                    },
                    gridCard: {
                        type: 'card',
                        options: {
                            headerTitle: '卡片类型自带的标题'
                        },
                        blocks: {
                            emptyCardText: {
                                type: 'component',
                                options: {
                                    is: 'div',
                                    text: '这里是自定义内容'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    operations: {
        current: 'none',
    },
    options: {
        current: 'none'
    },
    props: {
        current: 'none'
    }
};

export const defaults = {};
