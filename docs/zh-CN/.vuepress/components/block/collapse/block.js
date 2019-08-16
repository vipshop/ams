export default {
    defaultCollapse: {
        type: 'collapse',
        options: {
            'defaultCollapseBlock1': `一致性 <i class="header-icon el-icon-info"></i>`,
            'defaultCollapseBlock2': '反馈'
        },
        data: {
            active: "defaultCollapseBlock1"
        },
        blocks: {
            defaultCollapseBlock1: {
                type: 'component',
                options: {
                    is: 'p',
                    text: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                }
            },
            defaultCollapseBlock2: {
                blocks: {
                    block21: {
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
                    },
                    block22: {
                        type: 'component',
                        options: {
                            is: 'h1',
                            text: '我是文字'
                        }
                    }
                }
            }
        }
    },
    collapse2: {
        type: 'collapse',
        options: {
            'defaultCollapseBlock1': `一致性 <i class="header-icon el-icon-info"></i>`,
            'defaultCollapseBlock2': '效率',
            'defaultCollapseBlock3': '反馈'
        },
        data: {
            active: "defaultCollapseBlock1"
        },
        props: {
            accordion: true
        },
        blocks: {
            defaultCollapseBlock1: {
                type: 'component',
                options: {
                    is: 'p',
                    text: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
                }
            },
            defaultCollapseBlock2: {
                blocks: {
                    block21: {
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
                    },
                    block22: {
                        type: 'component',
                        options: {
                            is: 'h1',
                            text: '我是文字'
                        }
                    }
                }
            },
            defaultCollapseBlock3: {
                type: 'component',
                options: {
                    is: 'div',
                    html: '<p>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：</p><p>所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</p>'
                }
            }
        }
    }
}
