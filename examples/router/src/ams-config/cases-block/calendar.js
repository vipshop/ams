import ams from '@ams-team/ams';

ams.block('calendar', {
    resources: {
        'resource-calendar': {
            fields: {
                date: {
                    type: 'date',
                    label: '活动时间'
                },
                department_id: {
                    type: 'select',
                    label: '所属部类',
                    props: {
                        options: {
                            '1': '食品部',
                            '2': '母婴业务部',
                            '3': '女装业务部',
                            '4': '男装业务部'
                        }
                    }
                },
                activity_type: {
                    type: 'select',
                    label: '活动类型',
                    props: {
                        options: {
                            '1': '重点档期',
                            '3': '公司级大促',
                            '4': 'VIP大牌日',
                            '5': '穿戴类A促',
                            '6': '重点档期1+3',
                            '7': '话题活动',
                            '8': '大牌面对面',
                            '9': '三级品类促'
                        }
                    }
                },
                grade: {
                    type: 'select',
                    label: '活动等级',
                    props: {
                        options: {
                            '2': 'A',
                            '4': 'B+',
                            '5': 'B',
                            '6': 'B-',
                            '8': 'C'
                        }
                    }
                },
                rec_type: {
                    type: 'select',
                    label: '人群',
                    props: {
                        options: {
                            '2': '主流',
                            '3': '70后',
                            '4': '90后',
                            '5': '男士'
                        }
                    }
                }
            }
        }
    },
    blocks: {
        scheduleBlock: {
            type: 'calendar',
            ctx: 'view',
            resource: 'resource-calendar',
            data: {
                searchs: {
                    department_id: '',
                    activity_type: '',
                    grade: '',
                    rec_type: ''
                },
                year: 2019,
                month: 0,
                content: {}
            },
            options: {
                title: '活动日历看板',
                draggable: true
            },
            searchs: {
                department_id: true,
                activity_type: true,
                grade: true,
                rec_type: true
            },
            on: {
                end: function(obj) {
                    console.log('from:', obj.from.dataset.date, obj.from.dataset.time, obj.oldIndex);
                    console.log('to:', obj.to.dataset.date, obj.to.dataset.time, obj.newIndex);
                },
                'cell-click': function(index, id, date, time) {
                    console.log('click', index, id, date, time);
                }
            },
            events: {
                init: '@fieldChange',
                getList: '@getList'
            },
            actions: {
                fieldChange: function({ name, value }) {
                    const data = this.block.data;
                    if (name) {
                        data.searchs[name] = value;
                    }
                    const args = {};
                    this.callAction(this.block.events.getList, args);
                },

                getList: function(args) {
                    if (this.block.options.draggable) {
                        // 拖拽
                        this.block.data.content = {
                            1546272000000: {
                                10: [{
                                    html: `<div>测试数据1</div>`,
                                    id: 1
                                }, {
                                    html: `<div>测试数据2</div>`,
                                    id: 2
                                }],
                                20: [{
                                    html: `<div>测试数据3</div>`,
                                    id: 3
                                }]
                            },
                            1546876800000: {
                                10: [{
                                    html: `<div>测试数据4</div>`,
                                    id: 4
                                }],
                                20: [{
                                    html: `<div>测试数据5</div>`,
                                    id: 5
                                }]
                            }
                        };
                    } else {
                        // 不可拖拽
                        this.block.data.content = {
                            1546272000000: {
                                10: [`<div>测试数据1</div>`, `<div>测试数据2</div>`],
                                20: [`<div>测试数据3</div>`]
                            },
                            1546876800000: {
                                10: [`<div>测试数据4</div>`],
                                20: [`<div>测试数据5</div>`]
                            }
                        };
                    }
                }
            }
        }
    }
});
