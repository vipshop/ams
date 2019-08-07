import ams from '@ams-team/ams';

ams.block('chart-demo1', {
    resources: {
        chart1: {
            key: 'timeRadio',
            api: {
                prefix: 'https://easy-mock.com/mock/5c76c559086fe75d555c7744/templates/demo/',
                read: 'chartData1'
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
                }
            }
        },
        chart2: {
            api: {
                prefix: 'https://easy-mock.com/mock/5c76c559086fe75d555c7744/templates/demo/',
                read: 'chartData2'
            }
        }
    },
    blocks: {
        titles: {
            type: 'title',
            options: {
                title: '分货运营-概览'
            }
        },
        chart1Nav: {
            type: 'form',
            ctx: 'edit',
            resource: 'chart1',
            data: {
                timeRadio: 'a'
            },
            actions: {
                fieldChange({
                    name,
                    value
                }) {
                    if (name === 'timeRadio' && value && this.data) {
                        this.callAction(`@chart1.read:${value}`);
                    }
                }
            }
        },
        chart1: {
            type: 'chart',
            resource: 'chart1',
            style: {
                width: '100%',
                height: '500px',
                marginBottom: '100px'
            },
            data: {
                'xAxis': ['大盘1', '大盘2', '大盘3', '大盘4', '大盘5', '大盘6'],
                'legend': ['净收入', '毛利额', '毛利率'],
                'series1': [680, 500, 50, 30, 65, 57],
                'series2': [190, 155, 20, 25, 26, 16],
                'series3': [28, 30, 28, 32, 25, 5]
            },
            // 图表配置
            options: {
                BASE: 'LINE',
                title: {
                    text: '销售与毛利',
                    bottom: 0,
                    left: 'center',
                    textStyle: {
                        fontSize: 26
                    }
                },
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
                        fontSize: 16
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '百万元',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    axisLabel: {
                        fontSize: 18
                    }
                },
                {
                    type: 'value',
                    name: '%',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    axisLabel: {
                        fontSize: 18,
                        formatter: '{value} %'
                    }
                }
                ],
                series: [{
                    name: '净收入',
                    type: 'bar',
                    barGap: 0,
                    barWidth: 40,
                    data: 'data.series1'
                },
                {
                    name: '毛利额',
                    type: 'bar',
                    barWidth: 40,
                    data: 'data.series2'
                },
                {
                    name: '毛利率',
                    type: 'line',
                    smooth: false,
                    symbol: 'triangle',
                    symbolSize: 18,
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        formatter: '{c}%',
                        fontSize: 18
                    },
                    data: 'data.series3'
                }
                ]
            },
            events: {
                // init: '@read'
            }
        },
        chart2: {
            type: 'chart',
            style: {
                width: '100%',
                height: '500px'
            },
            resource: 'chart2',
            data: {
                'xAxis': ['大盘1', '大盘2', '大盘3', '大盘4', '大盘5', '大盘6'],
                'legend': ['存货货值', '周转天数'],
                'series1': [],
                'series2': []
            },
            // 图表配置
            options: {
                BASE: 'LINE',
                title: {
                    text: '存货与周转',
                    bottom: 0,
                    left: 'center',
                    textStyle: {
                        fontSize: 26
                    }
                },
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
                        fontSize: 16
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '百万元',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    axisLabel: {
                        fontSize: 18
                    }
                },
                {
                    type: 'value',
                    name: '天',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    axisLabel: {
                        fontSize: 18
                    }
                }
                ],
                series: [{
                    name: '存货货值',
                    type: 'bar',
                    barGap: 0,
                    barWidth: 50,
                    data: 'data.series1'
                },
                {
                    name: '周转天数',
                    type: 'line',
                    smooth: false,
                    symbol: 'rect',
                    symbolSize: 15,
                    yAxisIndex: 1,
                    label: {
                        show: true,
                        fontSize: 18
                    },
                    data: 'data.series2'
                }
                ]
            },
            events: {
                init: '@read'
            }
        }

    }
});
