(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
})(this, function (exports, echarts) {
    let log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    const color = [
        '#5258FF',
        '#FF67C6',
        '#D92187',
        '#FF4C57',
        '#FF790C',
        '#FFC033',
        '#ABC91C',
        '#3ABA05',
        '#00D698',
        '#20C0FF',
        '#0A94FF',
        '#8B53FF',
        '#333AFF',
        '#722EFF',
        '#EF38AA',
        '#C31E79',
        '#EC202C',
        '#EB6900',
        '#EBA300',
        '#98B319',
        '#33A404',
        '#00B37F',
        '#00A5E6',
        '#007EE0',
        '#888DF6',
        '#A67AFF',
        '#FF94D7',
        '#E3459C',
        '#FF8A91',
        '#FF9D4C',
        '#FFC84D',
        '#BFE01F',
        '#41D106',
        '#00E6A3',
        '#57CFFF',
        '#42ADFF'
    ];
    echarts.registerTheme('vipshop', {
        'color': color,
        'backgroundColor': 'rgba(0,0,0,0)',
        'textStyle': {},
        'title': {
            'textStyle': {
                'color': '#333333',
                'fontSize': 14
            },
            'subtextStyle': {
                'color': '#666666'
            }
        },
        'line': {
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': '2'
                }
            },
            'xAxis': {
                'boundaryGap': false
            },
            'symbolSize': '6',
            // 'symbol': 'circle',
            'smooth': true
        },
        'radar': {
            'name': {
                'textStyle': {
                    'color': '#666',
                    'backgroundColor': 'transparent',
                    'borderRadius': 3,
                    'padding': [3, 5]
                }
            },
            'itemStyle': {
                'normal': {
                    'borderWidth': '2'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': '2'
                }
            },
            'symbolSize': '6',
            'symbol': 'emptyCircle',
            'smooth': true,
        },
        'bar': {
            'itemStyle': {
                'normal': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                },
                'emphasis': {
                    'barBorderWidth': 0,
                    'barBorderColor': '#cccccc'
                }
            }
        },
        'pie': {
            'legend': {
                'orient': 'vertical',
                'x': 'left'
            },
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'scatter': {
            'legend': {
                'right': 10
            },
            'xAxis': {
                'scale': true
            },
            'yAxis': {
                'scale': true     // y轴不会强制包含零刻度，在双数值轴的散点图中比较有用
            },
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'boxplot': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'parallel': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'sankey': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'funnel': {
            color: color,
            'toolbox': {
                'feature': {
                    'dataView': {
                        'readOnly': false
                    },
                    'restore': {},
                    'saveAsImage': {}
                }
            },
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'gauge': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                },
                'emphasis': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            }
        },
        'candlestick': {
            'itemStyle': {
                'normal': {
                    'color': '#edafda',
                    'color0': 'transparent',
                    'borderColor': '#d680bc',
                    'borderColor0': '#8fd3e8',
                    'borderWidth': '2'
                }
            }
        },
        'graph': {
            'itemStyle': {
                'normal': {
                    'borderWidth': 0,
                    'borderColor': '#cccccc'
                }
            },
            'lineStyle': {
                'normal': {
                    'width': 1,
                    'color': '#aaa'
                }
            },
            'symbolSize': '6',
            'symbol': 'emptyCircle',
            'smooth': true,
            'color': [
                '#684bc5',
                '#50b5ff',
                '#f56c6c',
                '#67c23a',
                '#f7a545'
            ],
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#ffffff'
                    }
                }
            }
        },
        'map': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#f3f3f3',
                    'borderColor': '#516b91',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(165,231,240,1)',
                    'borderColor': '#516b91',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#000'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(81,107,145)'
                    }
                }
            }
        },
        'geo': {
            'itemStyle': {
                'normal': {
                    'areaColor': '#f3f3f3',
                    'borderColor': '#516b91',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'areaColor': 'rgba(165,231,240,1)',
                    'borderColor': '#516b91',
                    'borderWidth': 1
                }
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#000'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': 'rgb(81,107,145)'
                    }
                }
            }
        },
        'categoryAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#cccccc'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#999999'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#eeeeee'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.02)'
                    ]
                }
            }
        },
        'valueAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#cccccc'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#999999'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#eeeeee'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.02)'
                    ]
                }
            }
        },
        'logAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#cccccc'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#999999'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#eeeeee'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.02)'
                    ]
                }
            }
        },
        'timeAxis': {
            'axisLine': {
                'show': true,
                'lineStyle': {
                    'color': '#cccccc'
                }
            },
            'axisTick': {
                'show': false,
                'lineStyle': {
                    'color': '#333'
                }
            },
            'axisLabel': {
                'show': true,
                'textStyle': {
                    'color': '#999999'
                }
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': [
                        '#eeeeee'
                    ]
                }
            },
            'splitArea': {
                'show': false,
                'areaStyle': {
                    'color': [
                        'rgba(250,250,250,0.05)',
                        'rgba(200,200,200,0.02)'
                    ]
                }
            }
        },
        'toolbox': {
            'iconStyle': {
                'normal': {
                    'borderColor': '#999'
                },
                'emphasis': {
                    'borderColor': '#666'
                }
            }
        },
        'legend': {
            // 'icon': 'circle',
            'textStyle': {
                'color': '#999999'
            }
        },
        'tooltip': {
            'backgroundColor': 'rgba(0, 0, 0, 0.7)',
            'padding': 15,
            'textStyle': {
                'color': '#eee'
            }
        },
        'timeline': {
            'lineStyle': {
                'color': '#8fd3e8',
                'width': 1
            },
            'itemStyle': {
                'normal': {
                    'color': '#8fd3e8',
                    'borderWidth': 1
                },
                'emphasis': {
                    'color': '#8fd3e8'
                }
            },
            'controlStyle': {
                'normal': {
                    'color': '#8fd3e8',
                    'borderColor': '#8fd3e8',
                    'borderWidth': 0.5
                },
                'emphasis': {
                    'color': '#8fd3e8',
                    'borderColor': '#8fd3e8',
                    'borderWidth': 0.5
                }
            },
            'checkpointStyle': {
                'color': '#8fd3e8',
                'borderColor': 'rgba(138,124,168,0.37)'
            },
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#8fd3e8'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#8fd3e8'
                    }
                }
            }
        },
        'visualMap': {
            'color': [
                '#516b91',
                '#59c4e6',
                '#a5e7f0'
            ]
        },
        'dataZoom': {
            'backgroundColor': 'rgba(0,0,0,0)',
            'dataBackgroundColor': 'rgba(255,255,255,0.3)',
            'fillerColor': 'rgba(167,183,204,0.4)',
            'handleColor': '#a7b7cc',
            'handleSize': '100%',
            'textStyle': {
                'color': '#333'
            }
        },
        'markPoint': {
            'label': {
                'normal': {
                    'textStyle': {
                        'color': '#ffffff'
                    }
                },
                'emphasis': {
                    'textStyle': {
                        'color': '#ffffff'
                    }
                }
            }
        },
        'xAxis': {
            'boundaryGap': false,
            'axisLine': {
                'show': false
            },
            'axisLabel': {
                'color': '#999'
            },
            'axisTick': {
                'show': false
            },
            'splitLine': {
                'show': true,
                'interval': 0,
                'lineStyle': {
                    'width': 1,
                    'type': 'solid',
                    'color': '#eee'
                }
            },
            'splitArea': {
                'show': false
            }
        },
        'yAxis': {
            'axisLine': {
                'show': false
            },
            'axisLabel': {
                'color': '#999'
            },
            'axisTick': {
                'show': false
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'width': 1,
                    'type': 'solid',
                    'color': '#eee'
                }
            },
            'splitArea': {
                'show': false
            }
        },
        'axisPointer': {
            'lineStyle': {
                'color': '#684BC5',
                'width': 30,
                'opacity': 0.1
            }
        }
    });
});
