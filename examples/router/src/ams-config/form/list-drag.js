import ams from '@ams-team/ams';
import { prefix } from '@/utils';

ams.block('list-drag', {
    ctx: 'view',
    type: 'list',
    resource: {
        api: {
            prefix: prefix,
            list: 'list-drag'
        },
        fields: {
            id: {
                type: 'text',
                label: 'ID',
                props: {
                    'class-name': 'drag-column'
                }
            },
            title: {
                type: 'text',
                label: '标题'
            },
            content: {
                type: 'textarea',
                label: '内容'
            },
            // 字段名
            select: {
                ctx: 'edit',
                type: 'select',
                label: '选择',
                default: '内容配置',
                style: {
                    width: '95px',
                },
                props: {
                    width: 105,
                    multiple: false,
                    size: 'mini',
                    options: []
                },
                changeConfig: function(field, data) {
                    data.select = '内容配置';
                    if (data.id < 3) {
                        field.props.options = [
                            {
                                value: 'a',
                                label: 'test1'
                            }
                        ];
                    } else {
                        field.type = 'button';
                        field.label = '内容配置';
                    }
                    // console.log('field---', field)
                    return field;
                },
                on: {
                    change(...arg) {
                        console.log('arg', arg);
                    }
                },
                event: 'goButton'
            }
        }
    },
    props: {
        // 自动加上索引
        type: 'index'
    },
    options: {
        operationsWidth: '120px',
        // 支持拖拽
        drag: true,
        // 隐藏拖拽icon
        showDragIcon: false
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
        goButton({ $prevReturn }) {
            console.log('ddds---', $prevReturn);
        },
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
