import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-drag', {
    type: 'list',
    resource: {
        api: {
            prefix: prefix,
            list: 'list-drag'
        },
        fields: {
            'id': {
                'type': 'text',
                'label': 'ID'
            },
            'title': {
                'type': 'text',
                'label': '标题'
            },
            'content': {
                'type': 'textarea',
                'label': '内容'
            }
        }
    },
    ctx: 'view',
    props: {
        // 自动加上索引
        type: 'index'
    },
    options: {
        // 支持拖拽
        drag: true
    },
    operations: {
        delete: {
            type: 'button',
            label: '删除',
            props: {
                size: 'mini'
            }
        }
    },

    on: {
        'drag-start': function({ oldIndex }) {
            console.log('drag-start', oldIndex);
        },
        'drag-end': function({ oldIndex, newIndex }) {
            console.log('drag-end', oldIndex, newIndex);
        },
        'cell-click': function() {
            console.log('cell-click', this);
            this.$refs.amsTable.clearFilter();
        }
    },
    data: {
        pageSize: 20,
        // 定义分页数
        pageSizes: [10, 20]
    },
    events: {
        init: '@list',
        edit: '@routerPush:/list/edit',
        replace: '@routerReplace:/list/edit',
        back: '@routerGo:-1'
    },

    actions: {
        delete({ $prevReturn }) {
            console.log('delete', $prevReturn);
        },
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
    }
});
