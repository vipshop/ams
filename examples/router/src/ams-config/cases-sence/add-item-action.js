import ams from '@ams-team/ams';

ams.block('add-item-action', {
    type: 'list',
    resource: 'resource',
    events: {
        init: '@list',
        add: '@addItemAfter @after',
        addDialog: '@addItemDialog @after',
        edit: '@editItemAfter @after',
        editDialog: '@editItemDialog @after'
    },
    fields: {
        testVideo: false,
        testAudio: false,
        precent: false,
        testArrays: false,
        testText: false,
        testRadioArray: false,
        testCheckboxArray: false
    },
    actions: {
        after() {
            console.log('after');
        }
    },
    operations: {
        add: {
            slot: 'searchs',
            type: 'button',
            label: '添加'
        },
        addDialog: {
            slot: 'searchs',
            type: 'button',
            label: '弹窗添加'
        },
        edit: {
            type: 'button',
            label: '修改'
        },
        editDialog: {
            type: 'button',
            label: '弹窗修改'
        }
    }
});
