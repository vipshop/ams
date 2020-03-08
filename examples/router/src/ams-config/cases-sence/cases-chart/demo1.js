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
                xAxis: ['大盘', '特卖会', '唯品仓', '云品仓', 'VIPSHOP', 'VIPMAXX'],
                legend: ['净收入', '毛利额', '毛利率'],
                series1: [680, 500, 50, 30, 65, 57],
                series2: [190, 155, 20, 25, 26, 16],
                series3: [28, 30, 28, 32, 25, 5]
            },
            // 图表配置
            options: {
                // 方式二
                watermark: {
                    width: '200px', // 默认值300px
                    height: '150px', // 默认值 200px
                    textAlign: 'center', // 默认值center
                    textBaseLine: 'middle', // 默认值middle
                    font: '18px Microsoft Yahei', // 设置字体，默认为：18px Microsoft Yahei
                    fillStyle: 'rgba(236, 234, 234, 0.8)', // 设置颜色，默认为：rgba(236, 234, 234, 0.8)
                    content: 'zebin.wu', // 设置水印内容，默认为“请勿外传”
                    rotate: '30', // 设置旋转角度，默认30
                    zIndex: 0 // 设置z-index层级，默认
                },
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
                xAxis: ['大盘', '特卖会', '唯品仓', '云品仓', 'VIPSHOP', 'VIPMAXX'],
                legend: ['存货货值', '周转天数'],
                series1: [],
                series2: []
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
        },
        analysisCustomerCharts2: {
            type: 'chart',
            style: {
                width: '100%',
                height: '302px',
                float: 'left'
            },
            data: {
                legendData: [],
                xAxis: [],
                yAxisMax: 500,
                series: []
            },
            options: {
                watermark: true,
                BASE: 'LINE',
                scale: true,
                grid: {
                    show: true,
                    left: '45px',
                    right: '14px'
                },
                title: {
                    text: '最近30日趋势图',
                    left: '40px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: 'data.series',
                legend: {
                    top: '0',
                    right: '7px',
                    data: 'data.legendData'
                },
                xAxis: {
                    boundaryGap: false
                },
                yAxis: {
                    min: 0,
                    max: 'data.yAxisMax'
                },
                emphasis: {
                    smooth: true
                }
            },
            events: {
                init: '@analysisCustomerCharts2Change.setData',
                refresh: '@refresh'
            },
            actions: {
                refresh(data) {
                    const chartData = data.data.detail || [];
                    const xAxisData = {
                        legendData: [],
                        xAxis: [],
                        yAxisMax: data.target === 'sellIndex' ? 500 : 100,
                        series: []
                    };
                    const selfIndex = [];
                    const avgIndex = [];
                    chartData.forEach(v => {
                        xAxisData.xAxis.push(v.date);
                        selfIndex.push(v[data.target]);
                        avgIndex.push(v[`${data.target}Avg`]);
                    });

                    xAxisData.legendData = ['自身指数'];
                    xAxisData.series = [
                        {
                            name: '自身指数',
                            stack: '总量1',
                            data: selfIndex
                        }
                    ];
                    this.setBlockData({
                        ...xAxisData
                    });
                    console.log(JSON.parse(JSON.stringify(this.data)));
                    // this.data = xAxisData;
                }
            },
            blocks: {
                analysisCustomerCharts2Change: {
                    type: 'component',
                    style: {
                        position: 'absolute',
                        width: '200px',
                        left: '180px',
                        top: '-5px',
                        zIndex: 2
                    },
                    operations: {
                        sellIndexType: {
                            type: 'field',
                            field: {
                                type: 'select',
                                lable: '指数维度',
                                default: 'sellIndex',
                                props: {
                                    multiple: false,
                                    options: {
                                        'sellIndex': '整体指数',
                                        'brightness': '发光度',
                                        'heatness': '热览度',
                                        'growth': '成长度',
                                        'faithfulness': '忠诚度',
                                        'fission': '裂变度'
                                    }
                                }
                            }
                        }
                    },
                    actions: {
                        fieldChange({ name, value, path }) {
                            console.log('fieldChange', name, value, path, this.data);
                            this.callAction('analysisCustomerCharts2.refresh', {
                                target: value,
                                data: this.data
                            });
                        },
                        setData(data) {
                            const result = { 'sellIndexYesterday': { 'brightness': 50, 'brightnessAvg': 35, 'heatness': 59, 'heatnessAvg': 60, 'growth': 65, 'growthAvg': 63, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 55, 'fissionAvg': 56, 'sellIndex': 296, 'sellIndexAvg': 284, 'date': '09/14' }, 'detail': [{ 'brightness': 56, 'brightnessAvg': 28, 'heatness': 62, 'heatnessAvg': 61, 'growth': 72, 'growthAvg': 64, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 60, 'fissionAvg': 58, 'sellIndex': 317, 'sellIndexAvg': 282, 'date': '09/09' }, { 'brightness': 51, 'brightnessAvg': 36, 'heatness': 59, 'heatnessAvg': 59, 'growth': 66, 'growthAvg': 61, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 56, 'fissionAvg': 57, 'sellIndex': 299, 'sellIndexAvg': 283, 'date': '09/10' }, { 'brightness': 50, 'brightnessAvg': 36, 'heatness': 57, 'heatnessAvg': 58, 'growth': 64, 'growthAvg': 60, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 54, 'fissionAvg': 56, 'sellIndex': 292, 'sellIndexAvg': 281, 'date': '09/11' }, { 'brightness': 50, 'brightnessAvg': 37, 'heatness': 56, 'heatnessAvg': 57, 'growth': 60, 'growthAvg': 58, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 53, 'fissionAvg': 55, 'sellIndex': 286, 'sellIndexAvg': 277, 'date': '09/12' }, { 'brightness': 50, 'brightnessAvg': 34, 'heatness': 57, 'heatnessAvg': 58, 'growth': 62, 'growthAvg': 59, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 54, 'fissionAvg': 55, 'sellIndex': 290, 'sellIndexAvg': 277, 'date': '09/13' }, { 'brightness': 50, 'brightnessAvg': 35, 'heatness': 59, 'heatnessAvg': 60, 'growth': 65, 'growthAvg': 63, 'faithfulness': 67, 'faithfulnessAvg': 69, 'fission': 55, 'fissionAvg': 56, 'sellIndex': 296, 'sellIndexAvg': 284, 'date': '09/14' }], 'defaultOperations': { 'sellIndexType': 'brightness' }};
                            this.data = result;
                        }
                    }
                }
            }
        }
    }
});
