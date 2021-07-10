import ams from '@ams-team/ams';

ams.block('chart-demo1', {
    'type': 'chart',
    'style': {
        'width': '100%',
        'height': '500px'
    },
    'resource': {
        'foreignKeys': ['timeRadio', 'classRadio', 'numRadio', 'rankRadio'],
        'api': {
            'withCredentials': false,
            'prefix': '//www.yournana.club/vipshop/chart/',
            'read': 'chartData6'
        },
        'fields': {
            'timeRadio': {
                'type': 'radio',
                'label': '',
                'props': {
                    'options': {
                        'a': '昨日',
                        'b': '周至今',
                        'c': '月至今',
                        'd': '季度至今',
                        'e': '年至今'
                    }
                }
            },
            'classRadio': {
                'type': 'radio',
                'label': '',
                'props': {
                    'options': {
                        'a': '按毛利率',
                        'b': '按净收入',
                        'c': '按毛利额',
                        'd': '按周转'
                    }
                }
            },
            'numRadio': {
                'type': 'radio',
                'label': '',
                'props': {
                    'options': {
                        'a': '前20名',
                        'b': '后20名'
                    }
                }
            },
            'rankRadio': {
                'type': 'radio',
                'label': '',
                'props': {
                    'options': {
                        'a': '品牌排名',
                        'b': '品类排名',
                        'c': '价格带排名'
                    }
                }
            }
        }
    },
    'data': {
        'title': '',
        'series1': []
    },
    'options': {
        'tooltip': {
            'trigger': 'axis',
            'axisPointer': {
                'type': 'cross'
            }
        },
        'legend': {
            'data': 'data.legend',
            'textStyle': {
                'fontSize': 20
            }
        },
        'xAxis': {
            'type': 'category',
            'data': 'data.xAxis',
            'axisLabel': {
                'interval': 0,
                'rotate': 30,
                'fontSize': 16,
                'height': 100,
                'width': 100
            }
        },
        'yAxis': [{
            'type': 'value'
        }],
        'series': [{
            'type': 'bar',
            'barWidth': 20,
            'label': {
                'show': true,
                'position': 'top'
            },
            'data': 'data.series1'
        }]
    },
    'events': {
        'init': '@read'
    }
});
