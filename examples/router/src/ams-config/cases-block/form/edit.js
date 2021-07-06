import ams from '@ams-team/ams';

ams.block('form-edit', {
    ctx: 'edit',
    type: 'form',
    resource: 'resource',
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
            },
            badge: {
                // 'is-dot': true,      // 原点显示
                // hidden: true,        // 隐藏
                // type: 'info',        // 类型：primary / success / warning / danger / info
                max: 3,                 // 超过最大值会显示 '{max}+'
                value: function(data) {
                    console.log('form-badge', data);
                    // return '' //同样不显示
                    return data.id; // 需要为数字或字符串
                }
            }
        },
        resetData: {
            type: 'button',
            label: '重置',
            show: 'testSwitch'
        },
        aa: {
            type: 'button',
            label: 'aa',
            show(context) {
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
        }
    },
    layout: {
        testTime: ['testTime', 'testDatetime']
        // testDatetime: 'testDatetime'
    },

    fields: {
        id: {
            style: {
                width: '200px'
            }
        }
    },
    on: {
        validate: function() {
            console.log('validate');
        },
        keyupEnter: function(args) {
            console.log('keyup.enter.native', this, args);
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
            slot: 'field:testText',
            type: 'title',
            options: {
                title: '主标题',
                subTitle: '副标题'
            },
            style: {
                marginLeft: '50px',
                marginBottom: '40px'
            }
        }
    }
});
