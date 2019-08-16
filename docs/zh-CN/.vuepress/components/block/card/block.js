export default {
    defaultCard: {
        type: 'card',
        style: {
            width: '600px',
            margin: '20px auto'
        },
        options: {
            headerTitle: '卡片标题',
        },
        operations: {
            viewMore: {
                type: 'button',
                label: '操作按钮',
                props: {
                    type: 'mini'
                }
            }
        },
        actions: {
            viewMore: function(){
                alert('你点击了操作按钮！')
            }
        },
        blocks: {
            emptyCardText: {
                type: 'component',
                options: {
                    is: 'div',
                    text: '我是自定义内容！我是自定义内容！我是自定义内容'
                }
            }
        }
    },
    simpleCard: {
        type: 'card',
        style: {
            width: '600px',
            margin: '20px auto'
        },
        props: {
            shadow: "hover"
        },
        blocks: {
            simpleCardText: {
                type: 'component',
                options: {
                    is: 'div',
                    html: '<p>我是自定义内容！</p><p>我是自定义内容！</p><p>我是自定义内容</p>'
                }
            }
        }
    },
    /* 配置标题为operations，内容为chart的卡 */
    scheduleBlock: {
        type: 'card',
        style: {
            width: '90%',
            margin: '20px auto',
        },
        operations: {
            viewMore: {
                type: 'button',
                label: '库存预警'
            }
        },
        actions: {
            viewMore: function(){
                alert('你点击了操作按钮！')
            }
        },
        blocks: {
            emptyCardText2: {
                type: 'title',
                options: {
                    title: '标题类型的主标题',
                    subTitle: '右边有个操作按钮喔'
                },
                slot: 'header'
            },
            scheduleContent: {
                type: 'chart',
                style: {
                    width: '480px',
                    height: '480px',
                    margin: '20px auto 0'
                },
                resource: {
                    api: {
                        // api前缀
                        prefix:
                            'https://www.easy-mock.com/mock/5bf25b2b34392218c898a5fd/',
                        // 读取数据接口
                        read: 'read',
                    }
                },
                data: {
                    legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                    xAxis: ["周二", "周二", "周二", "周四", "周五", "周六", "周日"],
                    series: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                    ]
                },
                // 图表配置
                options: {
                    BASE: 'PIE',
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            data: 'data.series'
                        }
                    ]
                },
                events: {
                    init: '@read'
                }
            }
        }
    }
}