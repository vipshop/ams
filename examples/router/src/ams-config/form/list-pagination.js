import ams from '@ams-team/ams';

ams.block('list-pagination', {
    type: 'list',
    ctx: 'view',
    resource: {
        api: {
            prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
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
    events: {
        init: '@list'
    }
});
