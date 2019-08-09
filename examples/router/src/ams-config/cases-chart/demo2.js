import ams from '@ams-team/ams';

ams.block('chart-demo2', {
    resources: {
        chart6: {
            foreignKeys: ['timeRadio', 'classRadio', 'numRadio', 'rankRadio'],
            api: {
                // api前缀
                prefix: 'https://easy-mock.com/mock/5c76c559086fe75d555c7744/templates/demo/',
                // 读取数据接口
                read: 'chartData6',
            },
            fields: {
                timeRadio: {
                    type: 'radio',
                    label: '',
                    props: {
                        options: {
                            a: '昨日',
                            b: '周至今',
                            c: '月至今',
                            d: '季度至今',
                            e: '年至今'
                        }
                    }
                },
                classRadio: {
                    type: 'radio',
                    label: '',
                    props: {
                        options: {
                            a: '按毛利率',
                            b: '按净收入',
                            c: '按毛利额',
                            d: '按周转'
                        }
                    }
                },
                numRadio: {
                    type: 'radio',
                    label: '',
                    props: {
                        options: {
                            a: '前20名',
                            b: '后20名'
                        }
                    }
                },
                rankRadio: {
                    type: 'radio',
                    label: '',
                    props: {
                        options: {
                            a: '品牌排名',
                            b: '品类排名',
                            c: '价格带排名'
                        }
                    }
                },
            }
        }
    },
    blocks: {
        titles: {
            type: 'title',
            options: {
                title: '分货运营-销售分析'
            }
        },
        tab: {
            type: 'tabs',
            options: {
                tab1: '大盘1',
                tab2: '大盘2',
                tab3: '大盘3',
                tab4: '大盘4',
                tab5: '大盘5',
                tab6: '大盘6'
            },
            props: {
                type: 'card'
            },
            blocks: {
                tab1: {
                    blocks: {
                        chart6Nav: {
                            ctx: 'edit',
                            type: 'form',
                            resource: 'chart6',
                            data: {
                                //   timeRadio: 'a',
                            },
                            actions: {
                                fieldChange({
                                    name,
                                    value
                                }) {
                                    console.log(name, value);
                                    if (name && value && this.data) {
                                        const ams = window.ams;
                                        ams.$prevReturn = {
                                            ...this.data
                                        };

                                        this.callAction(`@chart6.read`);
                                    }
                                }
                            }
                        },
                        chart6: {
                            type: 'chart',
                            style: {
                                width: '100%',
                                height: '500px'
                            },
                            resource: 'chart6',
                            data: {
                                title: '',
                                series1: [],
                            },
                            // 图表配置
                            options: {
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'cross'
                                    }
                                },
                                legend: {
                                    data: 'data.legend',
                                    textStyle: {
                                        fontSize: 20
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    data: 'data.xAxis',
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        fontSize: 16,
                                        height: 100,
                                        width: 100
                                    }
                                },
                                yAxis: [{
                                    type: 'value'
                                }],
                                series: [{
                                    type: 'bar',
                                    barWidth: 20,
                                    label: {
                                        show: true,
                                        position: 'top'
                                    },
                                    data: 'data.series1'
                                }]
                            },
                            events: {
                                init: '@read'
                            }
                        }
                    }
                },
                tab2: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '大盘2'
                    },
                    style: {
                        padding: '100px',
                    }
                },
                tab3: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '大盘3'
                    },
                    style: {
                        padding: '100px',
                    }
                },
                tab4: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '大盘4'
                    },
                    style: {
                        padding: '100px',
                    }
                },
                tab5: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '大盘5'
                    },
                    style: {
                        padding: '100px',
                    }
                },
                tab6: {
                    type: 'component',
                    options: {
                        is: 'div',
                        text: '大盘6'
                    },
                    style: {
                        padding: '100px',
                    }
                }
            }
        }
    }
});
