import ams from '@ams-team/ams';

ams.block('list', {
    type: 'list',
    resource: 'resource',
    ctx: 'view',
    props: {
        // 自动加上索引
        type: 'index'
    },
    options: {
        // 定义列表操作项的宽度
        operationsWidth: 300,
        // 支持拖拽
        drag: true
    },
    // 过滤设置（列表特有）
    filters: {
        id: true,
        testCheckbox: {
            // 多选
            multiple: false,
            // 远程过滤
            remote: true
        },
        testSelect: {
            // 多选
            multiple: true,
            // 远程过滤
            remote: false
        },
        testCheckboxArray: {
            // 多选
            multiple: true,
            // 远程过滤
            remote: false
        }
    },
    // 排序设置（列表特有）
    sorts: {
        testInputnumber: true,
        testDatetime: true
    },
    fields: {
        // id: false,
        precent: false,
        testVideo: false,
        testAudio: false,
        testArrays: false,
        testText: false,
        testTree: false,
        testRadioArray: false
    },

    operations: {
        edit: {
            type: 'button',
            label: '固定跳转',
            show: {
                name: 'testSwitch',
                value: '1'
            },
            props: {
                size: 'mini'
            },
            tooltip: {
                effect: 'dark',
                content: 'Top Left 提示文字',
                placement: 'top-start'
            },
            badge: {
                // 'is-dot': true,      // 原点显示
                // hidden: true,        // 隐藏
                // type: 'info',        // 类型：primary / success / warning / danger / info
                max: 3,                 // 超过最大值会显示 '{max}+'
                value: function(data) {
                    return data.id;  // 需要为数字或字符串
                }
            }
        },
        customEdit: {
            type: 'button',
            label: '参数跳转',
            show(data) {
                return data.id === 1 && data.testSwitch;
            },
            props: {
                size: 'mini'
            },

        },
        replace: {
            type: 'button',
            label: '替换跳转',
            show: 'testSwitch',
            props: {
                size: 'mini'
            },
            badge: {
                'is-dot': true,      // 原点显示
                type: 'warning',
                value: function(data) {
                    if (data.id <= 3) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },
        back: {
            type: 'button',
            label: '回退1',
            props: {
                size: 'mini'
            }
        },
        delete: {
            type: 'button',
            label: '删除',
            props: {
                size: 'mini'
            }
        },
        id: {
            slot: 'rightTop',
            type: 'field',
            label: '文本'
        },
        id2: {
            slot: 'leftBottom',
            type: 'field',
            field: 'id',
            label: '文本'
        },
        radioButton: {
            slot: 'searchs',
            type: 'field',
            label: '单选按钮',
            field: {
                type: 'checkbox',
                label: '单选按钮',
                props: {
                    type: 'button',
                    size: 'mini',
                    options: [
                        {
                            label: '黄金糕',
                            value: 'a'
                        },
                        {
                            label: '双皮奶',
                            value: 'b'
                        },
                        {
                            label: '蚵仔煎',
                            value: 'c'
                        }
                    ]
                }
            }
        },
        testSelect: {
            slot: 'searchs',
            type: 'field'
            // field: 'testSelect' // field可省略
            // label: '可省略'
        },
        addItem: {
            slot: 'searchs',
            type: 'button',
            label: '新增',
            props: {
                type: 'primary'
            }
        },
        button: {
            slot: 'rightTop',
            type: 'button',
            label: '搜索',
            props: {
                type: 'primary'
            },
            event: 'list:1',
            tooltip: {
                effect: 'dark',
                content: 'Top Left 提示文字',
                placement: 'top-start'
            },
            badge: {
                'is-dot': true,      // 原点显示
                // hidden: true,        // 隐藏
                // type: 'info',        // 类型：primary / success / warning / danger / info
                max: 3,                 // 超过最大值会显示 '{max}+'
                value: function(data) {
                    return true;
                }
            }
        },
        // search: {
        //     slot: 'searchs',
        //     type: 'button',
        //     props: {
        //         type: 'primary'
        //     },
        //     label: '搜索',
        //     event: 'list:1'
        // },
    },

    on: {
        'cell-click': function() {
            console.log('cell-click', this);
            this.$refs.amsTable.clearFilter();
        }
    },
    data: {
        pageSize: 20,
        // 定义分页数
        pageSizes: [10, 20],
        layout: 'total, prev, pager, next'
    },
    events: {
        submit: '@submit',
        init: '@list',
        edit: '@routerPush:/list/edit',
        replace: '@routerReplace:/list/edit',
        back: '@routerGo:-1'
    },

    actions: {
        submit({ $prevReturn }) {
            console.log('list-submit', $prevReturn);
        },
        addItem() {
            console.log('addItem action');
            // this.submit();
        },
        customEdit(params) {
            // console.log('customEdit', params)
            this.callAction('routerPush', {
                name: '编辑',
                query: { id: params.$prevReturn.id }
            });
        }
    },
    blocks: {
        listTop: {
            type: 'component',
            options: {
                is: 'div',
                text: '我是列表区块最顶部的插槽内容！！'
            },
            style: {
                padding: '20px',
                marginBottom: '20px',
                border: '1px solid #3eaf7c'
            },
            slot: 'top'
        },
        listTableTop: {
            type: 'component',
            options: {
                is: 'div',
                text: '我是列表区块表格顶部的插槽内容！！'
            },
            style: {
                padding: '20px',
                border: '1px solid #f60'
            },
            slot: 'tableTop'
        }
    }
});
