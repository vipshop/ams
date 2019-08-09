export const config = {
    BASE: 'CONFIG_BLOCK',
    type: {
        default: 'dropdown'
    },
    blocks: {
        current: 'none',
    },
    operations: {
        current: 'none',
    },
    options: {
        current: 'value',
        fields: {
            value: {
                default: {
                    menu: '下拉菜单',
                    menuItems: [
                        '黄金糕',
                        '狮子头',
                        '螺蛳粉',
                        {
                            text: '双皮奶',
                            props: {
                                disabled: true,
                            }
                        }, {
                            text: '蚵仔煎',
                            props: {
                                divided: true,
                                icon: 'el-icon-check'
                            }
                        }
                    ]
                }
            }
        }
    },
    props: {
        current: 'value',
        fields: {
            value: {
                default: {
                    'split-button': true
                }
            }
        }
    }
};

export const defaults = {};
