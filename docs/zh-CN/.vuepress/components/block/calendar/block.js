export default {
    scheduleBlock: {
        type: 'calendar',
        ctx: 'view',
        resource: {
            fields: {
                date: {
                    type: 'date',
                    props: {
                        'value-format': 'yyyy-MM',
                        type: 'month'
                    }
                },
            }
        },
        data: {
            searchs: {
                date: '2019-03'  // 搜索框数据，与year month一一对应
            },
            year: 2019,  // 日历看板展示year年month+1月
            month: 2,    // 日历看板展示year年month+1月
            content: {}  // 数据
        },
        options: {
            title: '日历看板',
            draggable: true // 是否拖拽
        },
        searchs: {
            date: true
        },
        on: {
            end: function(obj) {
                console.log('from:', obj.from.dataset.date, obj.from.dataset.time, obj.oldIndex)
                console.log('to:', obj.to.dataset.date, obj.to.dataset.time, obj.newIndex)
            },
            'cell-click': function(index, id, date, time) {
                console.log('click', index, id, date, time)
            }
        },
        events: {
            init: '@fieldChange',
            getList: '@getList'
        },
        actions: {
            fieldChange: function({ name, value }) {
                const data = this.block.data
                if (name) {
                    data.searchs[name] = value
                }
                if (name === 'date') {
                    // 切换时间，看板展示数据相应变化
                    data.year = value.split('-')[0]
                    data.month = value.split('-')[1] - 1
                }
                const args = {}
                this.callAction(this.block.events.getList, args)
            },

            getList: function(args) {
                if (this.block.options.draggable) {
                    // 拖拽
                    this.block.data.content = {
                        1551974400000: {
                            10: [{
                                html: `<div>数据1</div>`,
                                id: 1
                            }, {
                                html: `<div>数据2</div>`,
                                id: 2
                            }],
                            20: [{
                                html: `<div>数据3</div>`,
                                id: 3
                            }]
                        },
                        1552320000000: {
                            10: [{
                                html: `<div>数据4</div>`,
                                id: 4
                            }],
                            20: [{
                                html: `<div>数据5</div>`,
                                id: 5
                            }]
                        }
                    }
                } else {
                    // 不可拖拽
                    this.block.data.content = {
                        1551974400000: {
                            10: [`<div>数据1</div>`, `<div>数据2</div>`],
                            20: [`<div>数据3</div>`]
                        },
                        1552320000000: {
                            10: [`<div>数据4</div>`],
                            20: [`<div>数据5</div>`]
                        }
                    }
                }
            }
        }
    }
}