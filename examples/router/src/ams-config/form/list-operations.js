import ams from '@ams-team/ams';

ams.block('list-operations', {
    type: 'list',
    resource: 'resource',

    options: {
        // 支持多选
        multipleSelect: true,
        // 列表高度自适应屏幕
        tableHeightFit: true
    },
    props: {
        height: 600
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
        }
    },
    // 排序设置（列表特有）
    sorts: {
        testInputnumber: true
    },
    // 列表搜索（列表特有）
    // searchs: {
    //     testText: true,
    //     testTextarea: true
    // },

    fields: {
        testVideo: false,
        testAudio: false,
        testUnits: false
    },

    data: {
        searchs: {
            testText: 'a',
            testTextarea: 'b'
        }
    },

    operations: {
        dropdown: {
            slot: 'searchs',
            type: 'dropdown',
            label: '更多搜索',
            event: 'list',
            props: {
                placeholder: '搜索...'
            },
            style: {
                width: '300px'
            },
            fields: {
                testText: true,
                testDate: true,
                testTime: true,
                testDatetime: true,
                testSwitch: true
            }
        },
        edit: {
            type: 'button',
            label: '跳转'
        },
        edit2: {
            type: 'button',
            label: '跳转2'
        },

        testText: {
            slot: 'searchs',
            type: 'field',
            field: 'testText',
            label: '文本'
        },
        testSelect: {
            slot: 'searchs',
            type: 'field'
            // field: 'testSelect' // field可省略
            // label: '可省略'
        },
        testSwitch: {
            slot: 'searchs',
            type: 'field',
            field: 'testSwitch'
            // label: '可省略'
        },
        testNewInput: {
            slot: 'searchs',
            type: 'field',
            field: {
                type: 'text',
                props: {
                    placeholder: '折'
                },
                style: {
                    width: '50px'
                }
            }
        },
        search: {
            slot: 'searchs',
            type: 'button',
            props: {
                type: 'primary'
            },
            label: '搜索',
            event: 'list'
        },

        reset: {
            slot: 'searchs',
            type: 'reset',
            label: '重置'
        },

        selectMulti: {
            slot: 'multipleSelect',
            type: 'field',
            field: 'testSelect'
            // label: '可省略'
        },

        testSelect1: {
            type: 'field',
            field: 'testSelect'
            // label: '可省略'
        },

        buttonMulti: {
            slot: 'multipleSelect',
            type: 'button',
            label: '删除',
            event: 'multi'
        }
    },

    events: {
        init: '@list',
        edit: '@routerPush:/list/edit'
    },

    actions: {
        fieldChange(args) {
            console.log('fieldChange', args);
            if (args.path === 'multipleSelect.testSelect') {
                console.log('multipleSelect.testSelect', args.value);
            }
        },
        multi(args) {
            console.log('multipleSelect action', args.$prevReturn);
        },
        created() {
            console.log('created');
        },
        destroyed() {
            console.log('destroyed', this);
        }
    }
});
