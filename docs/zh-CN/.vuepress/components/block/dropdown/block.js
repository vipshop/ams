export default {
    defaultDropdown: {
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
                        disabled: true,
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
            type: 'primary',
            'split-button': true
        },
        style: {
            'margin-bottom': '50px'
        }
    },
    dropdown3: {
        type: 'dropdown',
        options: {
            menu: '点击触发下拉',
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
            trigger: 'click'
        },
        on: {
            command(command) {
                this.$message('click on item ' + command);
            }
        },
        style: {
            'margin-bottom': '50px'
        }
    },
    dropdown4: {
        type: 'dropdown',
        options: {
            menu: '下拉菜单',
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
                        icon: 'el-icon-check',
                        disabled: true
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
            'hide-on-click': false
        },
        style: {
            'margin-bottom': '50px'
        }
    }
}
