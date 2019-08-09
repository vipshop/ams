const blockConfig = {
    blocks: {
        tableViewAll: {
            type: 'table',
            resource: 'table',
            ctx: 'view',
            filters: { },
            // 排序设置
            sorts: {
                id: true,
                week: true
            },
            // 顶部搜索项设置
            searchs: { 
                id: true,
                grade1: true
            },
            data: {
                list: [],
                pageSize: 10
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
                        action: 'https://easy-mock.com/mock/5bf25b2b34392218c898a5fd/table-expand',
                        queryName: 'chidTableId',
                        queryValue: 'id'
                    }
                },
                // 多级表头配置，目前做多两级，无此配置按默认一级表头
                'table-column': [
                    {
                        label: '序号',
                        name: 'id'
                    },
                    {
                        label: '',
                        children: [
                            {
                                label: '一级品类',
                                name: 'grade1',
                                // 自定义表头提示框
                                'slot-header': {
                                    type: 'tooltip',
                                    content: '这里是一级品类信息<br/>第二行信息'
                                }
                            },
                            {
                                label: '二级品类',
                                name: 'grade2',
                                'slot-header': {
                                    type: 'tooltip',
                                    content: '这里是二级品类信息<br/>第二行信息'
                                }
                            }
                        ]
                    },
                    {
                        label: '收入',
                        'slot-header': {
                            type: 'tooltip',
                            content: '提示框信息<br/>第二行信息'
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
                                // 自定义表头提折叠项，collapseColumn为折叠表头数组
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
                // 单元格点击事件
                'cell-click': function(row, column, cell, event) {
                    // console.log('cell-click', row, column, cell, event)
                },
                // 表头点击事件
                'header-click': function(column, event) {
                    // console.log('header-click', column, event, this)
                }
            },

            events: {
                init: '@list'
            },
            actions: { }
        }
    }
}

export default blockConfig
