import ams from '@ams-team/ams';

ams.block('table', {
    ctx: 'view',
    type: 'table',
    resource: 'table',

    // 过滤设置（列表特有）
    filters: {
        // testCheckbox: {
        //     // 多选
        //     multiple: false,
        //     // 远程过滤
        //     remote: true
        // },
        // testSelect: {
        //     // 多选
        //     multiple: true,
        //     // 远程过滤
        //     remote: false
        // }
    },
    // 排序设置（列表特有）
    sorts: {
        id: true,
        week: true
    },
    data: {
        list: [],
        pageSize: 10
    },
    operations: {
        id: {
            slot: 'searchs',
            type: 'field',
            field: 'id',
            label: 'id'
        },
        grade1: {
            slot: 'searchs',
            type: 'field',
            field: 'grade1',
            label: '一级品类'
        },
        search: {
            slot: 'searchs',
            type: 'button',
            props: {
                type: 'primary'
            },
            label: '搜索',
            event: 'list'
        }
    },
    options: {
        // 动态合并行配置，指定需要合并的filed
        'span-merge': {
            grade1: true,
            grade2: true
        },
        // 展开行/子表配置
        'expand-row': {
            // 接口返回该字段来判断是否需要展开子表/展开行
            valueKey: 'rowchildren',
            // 展开子表/展开行的动态请求接口配置
            remoteConfig: {
                // action: 'http://localhost:9526/examples/router/mock/table-expand',
                action: 'https://easy-mock.com/mock/5bf25b2b34392218c898a5fd/table-expand',
                queryName: 'chidTableId',
                queryValue: 'id'
            }
        },
        // 多级表头配置
        'table-column': [
            {
                label: '序号',
                name: 'id',
                'slot-header': {
                    type: 'tooltip',
                    content: '提示框信息<br/>第二行信息'
                }
            },
            {
                label: '',
                children: [
                    {
                        label: '一级品类',
                        name: 'grade1',
                        'slot-header': {
                            type: 'tooltip',
                            content: '多行提示信息<br/>第二行信息'
                        }
                    },
                    {
                        label: '二级品类',
                        name: 'grade2',
                        'slot-header': {
                            type: 'tooltip',
                            content: '多行提示信息<br/>第二行信息'
                        }
                    }
                ]
            },
            {
                label: '收入',
                'slot-header': {
                    type: 'tooltip',
                    content: '多行提示信息<br/>第二行信息'
                },
                children: [
                    {
                        label: '第1天',
                        name: 'day1'
                    },
                    {
                        label: '第2天',
                        name: 'day2'
                    },
                    {
                        label: '第3天',
                        name: 'day3'
                    },
                    {
                        label: '第4天',
                        name: 'day4'
                    },
                    {
                        label: '第5天',
                        name: 'day5'
                    },
                    {
                        label: '第6天',
                        name: 'day6'
                    },
                    {
                        label: '第7天',
                        name: 'day7'
                    },
                    {
                        label: '前7天',
                        name: 'week',
                        'slot-header': {
                            type: 'collapse',
                            collapseColumn: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7']
                        }
                    }
                ]
            }
        ]
    },

    on: {
        'cell-click': function(row, column, cell, event) {
            // console.log('cell-click', row, column, cell, event)
        },
        'header-click': function(column, event) {
            // console.log('header-click', column, event, this)
        }
    },

    events: {
        init: '@list',
        // edit: '@routerPush:/list/edit',
        // edit: '@edit',
        replace: '@routerReplace:/list/edit',
        back: '@routerGo:-1'
    },

    actions: {
        edit(row) {
            console.log(row);
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
