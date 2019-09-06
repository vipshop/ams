import ams from '@ams-team/ams';

ams.block('form-edit', {
    type: 'form',
    resource: 'resource',
    ctx: 'edit',
    data: {
        hahah: '21'
    },
    config: {
        test: '11'
    },
    operations: {
        submit: {
            type: 'button',
            label: '更新',
            event: 'submit',
            // show: {
            //     name: 'testText',
            //     value: '1'
            // },
            props: {
                type: 'primary'
            }
        },
        resetData: {
            type: 'button',
            label: '重置',
            event: 'resetData',
            show: 'testSwitch'
        },
        aa: {
            type: 'button',
            label: 'aa',
            show(context) {
                // console.log(this, context);
                if (!context.testSwitch) {
                    return true;
                }
            }
        },
        testSelect1: {
            type: 'field',
            field: 'testSelect'
            // label: '可省略'
        },
        dropdown: {
            type: 'dropdown',
            label: '更多搜索',
            event: 'test',
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
    },

    layout: {
        testTime: ['testTime', 'testDatetime'],
        // testDatetime: 'testDatetime'
    },

    fields: {
        id: {
            style: {
                width: '200px'
            }
        }
    },

    events: {
        init: '@read:2',
        submit: '@validate @update'
    },
    actions: {
        test(arg) {
            console.log('test', arg);
        },
        fieldChange(arg) {
            console.log('fieldChange', arg);
        }
    },

    blocks: {
        title1: {
            type: 'title',
            options: {
                title: '主标题',
                subTitle: '副标题'
            },
            style: {
                marginLeft: '50px',
                marginBottom: '40px'
            },
            slot: 'field:testText'
        }
    }
});
