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
                type: 'textarea',
                label: 'ID',
                info: '这列拥有拖拽列表的功能'
            },
            title: {
                ctx: 'edit',
                type: 'text',
                label: '标题',
                props: {
                    'class-name': 'drag-column',
                    class: 'drag-ignore-element'
                }
            },
            content: {
                type: 'html',
                label: '内容',
                view(value, field, context) {
                    // console.log('this', field, context)
                    return `<b>${value}</b><div>我是html</div>`;
                }
            },
            // 字段名
            select: {
                ctx: 'edit',
                type: 'select',
                label: '选择',
                default: '内容配置',
                style: {
                    width: '95px'
                },
                props: {
                    width: 105,
                    multiple: false,
                    size: 'mini',
                    options: []
                },
                changeConfig: function(field, data) {
                    // 设置字段内容
                    data.select = '内容配置';
                    if (data.id < 3) {
                        field.props.options = [
                            {
                                value: 'a',
                                label: 'test1'
                            }, {
                                value: 'b',
                                label: 'test2'
                            }
                        ];
                    } else {
                        // 将该字段改为button类型，事件通过action触发
                        field.type = 'button';
                        field.label = '内容配置';
                    }
                    return field;
                },
                on: {
                    // 选择select事件监听
                    change(val, $field) {
                        console.log('change', val, $field);
                    }
                },
                // 按钮button事件触发action
                event: 'goButton'
            }
        }
    },
    props: {
        // 自动加上索引
        type: 'index',
        // 阻止列表搜索栏的回车搜索事件
        'enterkey-search': false,
        // 如果只想控制某一列，才能拥有拖拽的能力，那么可以将拖拽类名挂在对应的
        // 单元格上，`cell-class-name` 是 Element UI 表格组件的 Attr
        // https://element.eleme.cn/#/en-US/component/table#table-attributes
        'cell-class-name'({ row, column, rowIndex, columnIndex }) {
            // 只将类名挂在 `id` 字段这一列上的单元格
            if (column.columnKey === 'id') {
                return 'drag-column';
            }
        }
    },
    options: {
        operationsWidth: '120px',
        // 支持拖拽
        drag: true,
        // 隐藏拖拽icon
        showDragIcon: false
    },
    // 入参示例：https://github.com/SortableJS/Sortable#options
    // 事件除外，事件维持原有的方式，在列表的 `on` 内处理
    dragOptions: {
        // 示例：解决「标题列」内文本输入框划选会触发拖拽的问题，前提是标题字段
        // 绑定了一样的类名
        filter: '.drag-ignore-element',
        // https://github.com/SortableJS/Sortable/issues/972
        preventOnFilter: false
    },
    operations: {
        id: {
            slot: 'searchs',
            type: 'field',
            label: 'id'
        },
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
        'drag-choose'(evt) {
            console.log('drag-choose', evt);
        },
        'drag-unchoose'(evt) {
            console.log('drag-unchoose', evt);
        },
        'drag-add'(evt) {
            console.log('drag-add', evt);
        },
        'drag-update'(evt) {
            console.log('drag-update', evt);
        },
        'drag-sort'(evt) {
            console.log('drag-sort', evt);
        },
        'drag-remove'(evt) {
            console.log('drag-remove', evt);
        },
        'drag-filter'(evt) {
            console.log('drag-filter', evt);
        },
        'drag-move'(evt, originalEvent) {
            console.log('drag-move', evt, originalEvent);
        },
        'drag-clone'(evt) {
            console.log('drag-clone', evt);
        },
        'drag-change'(evt) {
            console.log('drag-change', evt);
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
