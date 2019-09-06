import ams from '@ams-team/ams';

ams.block('list', {
    type: 'list',
    resource: 'resource',
    ctx: 'view',
    props: {
        type: 'index'
    },
    options: {
        // 定义列表操作项的宽度
        operationsWidth: 300
    },
    // 过滤设置（列表特有）
    filters: {
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
            }
        },
        replace: {
            type: 'button',
            label: '替换跳转',
            show: 'testSwitch',
            props: {
                size: 'mini'
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
        button: {
            slot: 'rightTop',
            type: 'button',
            label: '搜索',
            props: {
                type: 'primary'
            },
            event: 'list:1'
        },
        testSelect: {
            slot: 'searchs',
            type: 'field'
            // field: 'testSelect' // field可省略
            // label: '可省略'
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

    events: {
        init: '@list',
        edit: '@routerPush:/list/edit',
        replace: '@routerReplace:/list/edit',
        back: '@routerGo:-1'
    },

    actions: {
        addItem() {
            console.log('addItem action');
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
                height: '80px',
                'line-height': '80px',
                margin: '20px auto 0',
                border: '1px solid #E4E7ED'
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
                height: '80px',
                'line-height': '80px',
                margin: '20px auto 0',
                border: '1px solid #E4E7ED'
            },
            slot: 'tableTop'
        }
    }
});
