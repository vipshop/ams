import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-simulate', {
    ctx: 'view',
    type: 'list',
    resource: {
        api: {
            prefix: prefix,
            list: 'list'
        },
        fields: {
            id: {
                type: 'textarea',
                label: 'ID',
                props: {
                    'class-name': 'drag-column'
                }
            },
            testText: {
                type: 'text',
                label: '店铺'
            }
        }
    },
    props: {
        // 阻止列表搜索栏的回车搜索事件
        'enterkey-search': false,
        'pagination': 'simulate'
    },
    sorts: {
        id: true,
        testText: true
    },
    options: {
        operationsWidth: '120px',
        multipleSelect: true
    },
    data: {
        list: Array.from(Array(100), (v, k) => ({
            id: k + 1,
            testText: `标题${k + 1}`
        })),
        pageSize: 20,
        pageSizes: [10, 20]
    },
    events: {
        back: '@routerGo:-1'
    },
    operations: {
        multiSetHeader: {
            slot: 'searchs',
            type: 'filter',
            label: '批量设置表头'
        }
    }
});
