import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-field-convert', {
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
            },
            testRadio: {
                type: 'select',
                label: '美食',
                props: {
                    options: {
                        a: '黄金糕',
                        b: '双皮奶',
                        c: '蚵仔煎',
                        d: '龙须面',
                        e: '北京烤鸭',
                        1: '哈哈哈'
                    }
                }
            },
            testTextarea: {
                type: 'textarea',
                label: '介绍(店铺：美食）',
                changeConfig: function (field, data) {
                    data.testTextarea = `${data.testText}：${({
                        a: '黄金糕',
                        b: '双皮奶',
                        c: '蚵仔煎',
                        d: '龙须面',
                        e: '北京烤鸭',
                        1: '哈哈哈'
                    })[data.testRadio]}`;
                    return field;
                }
            },
            testRate: {
                type: 'rate',
                label: '店铺评分',
                changeConfig: function (field, data) {
                    field.type = 'html';
                    return field;
                },
                view(value, field, context) {
                    const rate = Math.floor(Math.random() * 5 + value);
                    if (rate >= 6) {
                        return `<span style="color: #f00">${rate}分（推荐）</span>`;
                    }
                    return `<span style="color: #0f0">${rate}分（不推荐）</span>`;
                }
            }
        }
    },
    props: {
        // 阻止列表搜索栏的回车搜索事件
        'enterkey-search': false
    },
    options: {
        operationsWidth: '120px',
        'table-column': [
            {
                label: 'ID',
                name: 'id'
            },
            {
                label: '店铺名称',
                children: [{
                    label: '店铺',
                    name: 'testText'
                }
                ]
            },
            {
                label: '店铺详情',
                children: [{
                    label: '美食',
                    name: 'testRadio'
                },
                {
                    label: '介绍',
                    name: 'testTextarea'
                },
                {
                    label: '店铺评分',
                    name: 'testRate'
                }
                ]
            }
        ]
    },
    data: {
        pageSize: 20,
        pageSizes: [10, 20]
    },
    events: {
        init: '@list',
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
