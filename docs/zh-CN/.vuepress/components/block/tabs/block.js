export default {
    defaultTabs: {
        type: 'tabs',
        options: {
            tab1: 'tab1',
            tab2: 'tab2'
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        }
    },
    cardTabs: {
        type: 'tabs',
        options: {
            tab1: 'tab1',
            tab2: 'tab2'
        },
        props: {
            type: 'card'
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        }
    },
    borderCardTabs: {
        type: 'tabs',
        options: {
            tab1: 'tab1',
            tab2: 'tab2'
        },
        props: {
            type: 'border-card'
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        }
    },
    tabpositionTabs: {
        type: 'tabs',
        options: {
            tabpositionTabs1: '用户管理',
            tabpositionTabs2: '配置管理',
            tabpositionTabs3: '角色管理',
            tabpositionTabs4: '定时任务补偿'
        },
        props: {
            tabPosition: 'left'
        },
        blocks: {
            tabpositionTabs1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tabpositionTabs2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tabpositionTabs3: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs3的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tabpositionTabs4: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs4的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        }
    },
    editableTabs: {
        type: 'tabs',
        options: {
            tab1: 'tab1',
            tab2: 'tab2'
        },
        props: {
            type: 'card',
            editable: true
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        },
        on: {
            'tab-click': function(tab) {
                console.log(tab);
            },
            edit: function(targetName, action){
                if (action === 'add') {
                    alert('添加')
                }
                if (action === 'remove') {
                    alert('删除')
                }
            }
        }
    },
    lazyTabs: {
        type: 'tabs',
        options: {
            tab1: '<i class="el-icon-date"></i> tab1标题',
            tab2: {
                label: '<i class="el-icon-date"></i> tab2延迟加载',
                lazy: true,
                closable: true
            },
            tab3: {
                label: '不可点',
                disabled: true
            }
        },
        blocks: {
            tab1: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs1的内容'
                },
                style: {
                    padding: '30px',
                }
            },
            tab2: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是tabs2的内容'
                },
                style: {
                    padding: '30px',
                }
            }
        }
    }
}
