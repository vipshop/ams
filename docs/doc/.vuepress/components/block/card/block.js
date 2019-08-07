const blockConfig = {
    resources: {
        /**
         * 配置数据（资源）
         * 首先我们需要配置`资源`、用于描述接口的`字段`组成、以及`api`的存取地址
         */
        ecahrtRes: {
            api: {
                // api前缀
                prefix:
                    'https://www.easy-mock.com/mock/5bf25b2b34392218c898a5fd/',
                // 读取数据接口
                read: 'read',
            }
        }
    },
    /**
     * 配置区块
     */
    blocks: {
        /* 配置只有文本内容没有标题的卡 */
        emptyCardBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0',
            },
            blocks: {
                emptyCardText: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '自定义内容'
                    }
                }
            }
        },
        /* 配置标题与内容均为文本的卡 */
        textHeaderCardBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0',
            },
            options: {
                headerTitle: '自定义标题',
            },
            blocks: {
                textHeaderCardText: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '自定义内容'
                    }
                }
            }
        },
        /* 配置标题为operations，内容为chart的卡 */
        scheduleBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto',
            },
            resource: 'resource-card',
            data: {
            },
            operations: {
                submit: {
                    type: 'button',
                    label: '库存预警',
                    props: {
                        type: 'mini'
                    }
                }
            },
            events: {
                // init: '@read'
            },
            blocks: {
                scheduleTitle: {
                    slot: 'header',
                    type: 'component',
                    options: {
                        is: 'div'
                    },
                    style: {
                        width: '40px',
                        height: '40px',
                        lineHeight: '40px',
                        float: 'left'
                    },
                    operations: {
                        text: {
                            type: 'button',
                            label: '部类货品',
                            props: {
                                type: 'mini'
                            }
                        }
                    }
                },
                scheduleContent: {
                    type: 'chart',
                    style: {
                        width: '480px',
                        height: '480px',
                        margin: '20px auto 0'
                    },
                    resource: 'ecahrtRes',
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
}

export default blockConfig