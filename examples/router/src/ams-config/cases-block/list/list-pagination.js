import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-pagination', {
    ctx: 'view',
    type: 'list',
    resource: {
        api: {
            prefix: prefix,
            list: 'list-pagination'
        },
        fields: {
            id: {
                type: 'text',
                label: 'ID'
            },
            title: {
                type: 'text',
                label: '标题',
                info: '我是提示1',
                // info: {
                //     icon: 'el-icon-question',
                //     content: '我是提示2'
                // },
                // props: {
                //     'suffix-info': '我是提示', // 后缀提示
                //     // 'suffix-info-warning': '我是提示warning', // 后缀警告提示
                //     // 'suffix-info-danger': '我是提示danger' // 后缀错误提示
                // },
                changeConfig(field, context) {
                    if (context) {
                        if (context.id === 2) {
                            field.props['suffix-icon'] = 'ams-icon-question';
                            field.props['suffix-info-warning'] = '我是提示warning';
                        } else if (context.id === 3) {
                            field.props['suffix-info-danger'] = '我是提示danger';
                        }
                    }
                    return field;
                }
            },
            content: {
                type: 'textarea',
                label: '内容',
                props: {
                    'suffix-info': '我是提示' // 后缀提示
                }
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
            label: 'id'
        },
        search: {
            slot: 'searchs',
            type: 'button',
            props: {
                type: 'primary'
            },
            label: '搜索',
            event: 'list:1'
        },
        title: {
            slot: 'rightTop',
            type: 'field',
            label: '文本'
        },
        content: {
            slot: 'rightBottom',
            type: 'field',
            label: '内容'
        }
    },
    pageSize: 10,
    props: {
        pagination: 'simulate', // 模拟分页
        'row-key': 'id',
        column: {
            'reserve-selection': true
        }
    },
    options: {
        // 支持多选
        multipleSelect: true
        // 列表高度自适应屏幕
        // tableHeightFit: true
    },
    events: {
        init: '@list'
    },
    actions: {
        fieldChange({ name, value, path }) {
            // console.log(name, value, path);
        }
    }
});
