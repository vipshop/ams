import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-pagination', {
    type: 'list',
    ctx: 'view',
    resource: {
        api: {
            prefix: prefix,
            list: 'list-pagination'
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
    // 排序设置（列表特有）
    sorts: {
        id: true
    },
    operations: {
        id: {
            slot: 'searchs',
            type: 'field',
            label: '文本'
        },
        search: {
            slot: 'searchs',
            type: 'button',
            props: {
                type: 'primary'
            },
            label: '搜索',
            event: 'list:1'
        }
    },
    pageSize: 10,
    props: {
        pagination: 'simulate' // 模拟分页
    },
    options: {
        // 支持多选
        multipleSelect: true,
        // 列表高度自适应屏幕
        // tableHeightFit: true
    },
    events: {
        init: '@list'
    }
});
