import ams from '@ams-team/ams';
ams.block('demo', {
    blocks: {
        title: {
            type: 'title',
            options: {
                title: '销售与毛利 <i class="el-icon-warning-outline"></i>'
            },
            style: {
                padding: '0 1rem',
                fontSize: '1rem',
                borderBottom: '1px solid #E5E5E5'
            }
        },
        buttons: {
            type: 'form',
            ctx: 'edit',
            resource: {
                fields: {
                    radioButtonA: {
                        type: 'radio',
                        default: 'a',
                        props: {
                            type: 'button',
                            size: 'small',
                            options: [
                                {
                                    label: '昨日',
                                    value: 'a',
                                },
                                {
                                    label: '周至今',
                                    value: 'b'
                                },
                                {
                                    label: '月至今',
                                    value: 'c'
                                },
                                {
                                    label: '季至今',
                                    value: 'd'
                                },
                                {
                                    label: '年至今',
                                    value: 'e'
                                }
                            ]
                        },
                        on: {
                            change(val) {
                                switch(val) {
                                    case 'a': 
                                        this.callAction('chart1.changeData', {
                                            series1: [680, 500, 50, 30, 65, 57],
                                            series2: [190, 155, 20, 25, 26, 16],
                                            series3: [28, 30, 28, 32, 25, 5]
                                        })
                                        return;
                                    case 'b': 
                                        this.callAction('chart1.changeData', {
                                            series1: [180, 200, 350, 300, 605, 257],
                                            series2: [290, 255, 120, 125, 126, 76],
                                            series3: [18, 50, 45, 30, 65, 57]
                                        })
                                        return;
                                    case 'c': 
                                        this.callAction('chart1.changeData', {
                                            series1: [280, 120, 150, 350, 165, 157],
                                            series2: [290, 255, 120, 125, 126, 76],
                                            series3: [18, 50, 45, 30, 65, 57]
                                        })
                                        return;
                                    case 'd': 
                                        this.callAction('chart1.changeData', {
                                            series1: [380, 120, 95, 230, 265, 357],
                                            series2: [290, 255, 120, 125, 126, 76],
                                            series3: [18, 50, 45, 30, 65, 57]
                                        })
                                        return;
                                    case 'e': 
                                        this.callAction('chart1.changeData', {
                                            series1: [190, 230, 310, 200, 60, 57],
                                            series2: [290, 255, 120, 125, 126, 76],
                                            series3: [18, 50, 45, 30, 65, 57]
                                        })
                                        return;
                                }
                            }
                        }
                    }
                }
            },
            props: {
                'label-width': '0'
            },
            style: {
                'text-align': 'center',
                'margin-top': '0.7rem'
            }
        },
        chart1: {
            type: 'chart',
            resource: {
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
            style: {
                width: '100%',
                height: '26rem',
                paddingBottom: '1rem',
                background: '#F6F8FD'
            },
            data: {
                'xAxis': ['大盘', '特卖会', '唯品仓', '云品仓', 'VIPSHOP', 'VIPMAXX'],
                'legend': ['净收入', '毛利额', '毛利率'],
                'series1': [680, 500, 50, 30, 65, 57],
                'series2': [190, 155, 20, 25, 26, 16],
                'series3': [28, 30, 28, 32, 25, 5]
            },
            // 图表配置
            options: {
                BASE: 'LINE',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: 'data.legend',
                    bottom: 0
                },
                grid: {
                    top: 40
                },
                xAxis: {
                    type: 'category',
                    data: 'data.xAxis',
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '(万元)'
                },
                {
                    type: 'value',
                    name: '(%)',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }],
                series: [{
                    name: '净收入',
                    type: 'bar',
                    barGap: 0,
                    barWidth: '30%',
                    data: 'data.series1'
                },
                {
                    name: '毛利额',
                    type: 'bar',
                    barWidth: '30%',
                    data: 'data.series2'
                },
                {
                    name: '毛利率',
                    type: 'line',
                    smooth: false,
                    symbolSize: 10,
                    yAxisIndex: 1,
                    label: {
                        show: true
                    },
                    data: 'data.series3'
                }
                ]
            },
            actions: {
                changeData({ series1, series2, series3 }) {
                    this.setBlockData({
                        series1,
                        series2,
                        series3
                    });
                }
            }
        },
        title2: {
            type: 'title',
            options: {
                title: '库存与周转 <i class="el-icon-warning-outline"></i>'
            },
            style: {
                padding: '0 1rem',
                fontSize: '1rem',
                borderBottom: '1px solid #E5E5E5'
            }
        },
        buttons2: {
            type: 'form',
            ctx: 'edit',
            resource: {
                fields: {
                    radioButtonA: {
                        type: 'radio',
                        default: 'a',
                        props: {
                            type: 'button',
                            size: 'small',
                            options: [
                                {
                                    label: '昨日',
                                    value: 'a',
                                }
                            ]
                        }
                    }
                }
            },
            props: {
                'label-width': '0'
            },
            style: {
                'margin-top': '0.7rem',
                'margin-left': '1.6rem'
            }
        },
        chart2: {
            type: 'chart',
            resource: {
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
            style: {
                width: '100%',
                height: '24rem',
                paddingBottom: '1rem',
                background: '#F6F8FD'
            },
            data: {
                'xAxis': ['大盘', '特卖会', '唯品仓', '云品仓', 'VIPSHOP', 'VIPMAXX'],
                'legend': ['净收入', '周转天数'],
                'series1': [280, 200, 50, 30, 65, 57],
                'series3': [28, 30, 28, 32, 25, 5]
            },
            // 图表配置
            options: {
                BASE: 'LINE',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: 'data.legend',
                    bottom: 0
                },
                grid: {
                    top: 40
                },
                xAxis: {
                    type: 'category',
                    data: 'data.xAxis',
                    axisLabel: {
                        interval: 0
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '(万元)'
                },
                {
                    type: 'value',
                    name: '(%)',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }],
                series: [{
                    name: '净收入',
                    type: 'bar',
                    barGap: 0,
                    barWidth: '30%',
                    data: 'data.series1'
                },
                {
                    name: '周转天数',
                    type: 'line',
                    smooth: false,
                    symbolSize: 10,
                    yAxisIndex: 1,
                    label: {
                        show: true
                    },
                    data: 'data.series3'
                }
                ]
            }
        }
    }
})