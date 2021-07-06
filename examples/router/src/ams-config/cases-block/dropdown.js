import ams from '@ams-team/ams';

ams.block('dropdown', {
    blocks: {
        dropdowntext1: {
            type: 'component',
            options: {
                is: 'h3',
                text: '普通示例：'
            }
        },
        dropdown1: {
            type: 'dropdown',
            options: {
                menu: '下拉菜单一',
                menuItems: [
                    '黄金糕',
                    '狮子头',
                    '螺蛳粉',
                    '双皮奶',
                    '蚵仔煎'
                ]
            },
            style: {
                'margin-bottom': '50px'
            }
        },
        dropdowntext2: {
            type: 'component',
            options: {
                is: 'h3',
                text: 'button示例：'
            }
        },
        dropdown2: {
            type: 'dropdown',
            options: {
                menu: '下拉菜单二',
                menuItems: [
                    '黄金糕',
                    '狮子头',
                    '螺蛳粉',
                    {
                        text: '双皮奶',
                        props: {
                            disabled: true
                        }
                    }, {
                        text: '蚵仔煎',
                        props: {
                            divided: true
                        }
                    }
                ]
            },
            props: {
                trigger: 'click',
                type: 'primary',
                'button': true
            },
            style: {
                'margin-bottom': '50px'
            }
        },
        dropdowntext3: {
            type: 'component',
            options: {
                is: 'h3',
                text: 'split-button示例：'
            }
        },
        dropdown3: {
            type: 'dropdown',
            options: {
                menu: '下拉菜单三',
                menuItems: [
                    '黄金糕',
                    '狮子头',
                    '螺蛳粉',
                    {
                        text: '双皮奶',
                        props: {
                            disabled: true
                        }
                    }, {
                        text: '蚵仔煎',
                        props: {
                            divided: true
                        }
                    }
                ]
            },
            props: {
                trigger: 'click',
                'split-button': true
            },
            style: {
                'margin-bottom': '50px'
            }
        },
        dropdowntext4: {
            type: 'component',
            options: {
                is: 'h3',
                text: '指令事件示例：'
            }
        },
        dropdown4: {
            type: 'dropdown',
            options: {
                menu: '下拉菜单四',
                menuItems: [
                    {
                        text: '黄金糕',
                        props: {
                            command: 'a',
                            icon: 'el-icon-plus'
                        }
                    },
                    {
                        text: '狮子头',
                        props: {
                            command: 'b',
                            icon: 'el-icon-circle-plus'
                        }
                    },
                    {
                        text: '螺蛳粉',
                        props: {
                            command: 'c',
                            icon: 'el-icon-circle-plus-outline'
                        }
                    },
                    {
                        text: '双皮奶',
                        props: {
                            command: 'd',
                            icon: 'el-icon-check'
                        }
                    }, {
                        text: '蚵仔煎',
                        props: {
                            command: 'e',
                            icon: 'el-icon-circle-check-outline'
                        }
                    }
                ]
            },
            props: {

            },
            on: {
                command(command) {
                    this.$message('click on item ' + command);
                }
            },
            style: {
                'margin-bottom': '50px'
            }
        }
    }
});
