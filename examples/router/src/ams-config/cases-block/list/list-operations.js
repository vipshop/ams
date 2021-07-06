import ams from '@ams-team/ams';

ams.block('list-operations', {
    type: 'list',
    resource: 'resource',

    options: {
        // 支持多选
        multipleSelect: true
        // 列表高度自适应屏幕
        // tableHeightFit: true
    },

    props: {
        // 设置多选列props
        'selection-props': {
            width: 100,
            align: 'center'
        }
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

    fields: {
        testVideo: false,
        testAudio: false,
        testUnits: false,
        precent: false,
        testArrays: false,
        testRadioArray: false,
        testCheckboxArray: false
    },

    data: {
        searchs: {
            testText: 'a',
            testTextarea: 'b'
        }
    },

    operations: {
        custome: {
            type: 'select',
            label: '自定义的搜索字段',
            props: {
                options: {
                    1: 'a',
                    2: 'b',
                    3: 'c'
                }
            }
        },

        edit: {
            type: 'button',
            label: '跳转',
            props: {
                disabled: false
            },
            changeConfig(field, context) {
                if (context.testInputnumber > 50) {
                    field.props.disabled = true;
                }
                return field;
            }
        },

        testText: {
            slot: 'searchs',
            type: 'field',
            field: 'testText',
            label: '文本'
        },
        testSelect: {
            slot: 'searchs',
            type: 'field',
            // field: 'testSelect' // field可省略
            // label: '可省略'
            props: {
                inline: false
            }
        },
        testSwitch: {
            slot: 'searchs',
            type: 'field',
            field: 'testSwitch',
            style: {
                height: '40px',
                'line-height': '40px'
            }
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
                    width: '70px'
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

        // testSelect1: {
        //     type: 'field',
        //     field: 'testSelect'
        //     // label: '可省略'
        // },

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
    on: {
        // 列表选择事件监听
        'selection-change': function() {
            console.log('selection-change', this.batchSelected);
        }
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
