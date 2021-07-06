import ams from '@ams-team/ams';

ams.block('card', {
    /**
     * 配置区块
     */
    blocks: {
        /* 配置只有文本内容没有标题的卡 */
        emptyCardBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0'
            },
            blocks: {
                emptyCardTextCard: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '只有自定义内容，没有标题'
                    }
                }
            },
            actions: {
                beforeDestroy: function() {
                    console.log('beforeDestroy');
                },
                destroyed: function() {
                    console.log('destroyed');
                }
            }
        },
        headerTitle: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0'
            },
            options: {
                headerTitle: '卡片类型自带的标题'
            },
            blocks: {
                emptyCardTextCard1: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '自定义内容'
                    }
                }
            }
        },
        emptyCardBlock2: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0'
            },
            blocks: {
                emptyCardTextCard21: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '自定义内容'
                    }
                },
                emptyCardTextCard22: {
                    type: 'title',
                    options: {
                        title: '标题类型的主标题',
                        subTitle: '标题类型的副标题'
                    },
                    slot: 'header'
                }
            }
        },
        emptyCardBlock3: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0'
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
            blocks: {
                emptyCardTextCard31: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '自定义内容'
                    }
                },
                emptyCardTextCard32: {
                    type: 'title',
                    options: {
                        title: '标题类型的主标题',
                        subTitle: '右边有个操作按钮喔'
                    },
                    slot: 'header'
                }
            }
        },
        /* 配置标题与内容均为文本的卡 */
        textHeaderCardBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto 0'
            },
            options: {
                headerTitle: '卡片类型自带的标题'
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
        cardScheduleBlock: {
            type: 'card',
            style: {
                width: '600px',
                margin: '20px auto'
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
            blocks: {
                cardScheduleTitle: {
                    slot: 'header',
                    type: 'component',
                    options: {
                        is: 'div'
                    },
                    style: {
                        height: '55px',
                        float: 'left',
                        padding: '13px 20px 0',
                        'border-bottom': '1px solid #EBEEF5'
                    },
                    operations: {
                        text: {
                            type: 'button',
                            label: '部类货品',
                            props: {
                                type: 'mini'
                            }
                        },
                        text2: {
                            type: 'button',
                            label: '部类货品',
                            props: {
                                type: 'mini'
                            }
                        }
                    }
                },
                cardScheduleContent: {
                    type: 'chart',
                    style: {
                        width: '480px',
                        height: '480px',
                        margin: '20px auto 0'
                    },
                    data: {
                        legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                        xAxis: ['周二', '周二', '周二', '周四', '周五', '周六', '周日'],
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
                    }
                }
            }
        }
    }
});
