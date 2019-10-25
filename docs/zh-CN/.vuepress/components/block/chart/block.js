import {prefix} from '../../utils/common'

export default {
    chartLine: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            title: '折线图表',
            legend: ['邮件营销','联盟广告'],
            xAxis: ["周二", "周二", "周二", "周四", "周五", "周六", "周日"],
            series1: [120, 132, 101, 134, 90, 230, 210]
        },
        // 图表配置
        options: {
            BASE: 'LINE',
            series: [
                {
                    name:'邮件营销',
                    stack: '总量',
                    data: 'data.series1'
                },
                {
                    name:'联盟广告',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        }
    },
    chartBar: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            legend: ['邮件营销','联盟广告'],
            xAxis: ["周二", "周二", "周二", "周四", "周五", "周六", "周日"],
            series1: [120, 132, 101, 134, 90, 230, 210],
            series2: [220, 182, 191, 234, 290, 330, 310]
        },
        // 图表配置
        options: {
            BASE: 'BAR',
            // 图例
            series: [
                {
                    name:'邮件营销',
                    data: 'data.series1'
                },
                {
                    name:'联盟广告',
                    data: 'data.series2'
                }
            ]
        }
    },
    chartPie: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            legend: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            xAxis: ["周二", "周二", "周二", "周四", "周五", "周六", "周日"],
            series: [
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        },
        // 图表配置
        options: {
            BASE: 'PIE',
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    data:'data.series'
                }
            ]
        }
    },
    chartFunnel: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            legend: ['展现','点击','访问','咨询','订单'],
            series: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'}
            ]
        },
        // 图表配置
        options: {
            BASE: 'FUNNEL',
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    data: 'data.series'
                }
            ]
        }
    },
    chartScatter: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            scatterData: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68]
            ]
        },
        // 图表配置
        options: {
            BASE: 'SCATTER',
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: 'data.scatterData',
                type: 'scatter'
            }]
        }
    },
    chartRadar: {
        type: 'chart',
        style: {
            width: '100%',
            height: '500px'
        },
        data: {
            legend: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
            series: [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '预算分配（Allocated Budget）'
                },
                {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '实际开销（Actual Spending）'
                }
            ],
            indicator: [
                { name: '销售（sales）', max: 6500},
                { name: '管理（Administration）', max: 16000},
                { name: '信息技术（Information Techology）', max: 30000},
                { name: '客服（Customer Support）', max: 38000},
                { name: '研发（Development）', max: 52000},
                { name: '市场（Marketing）', max: 25000}
            ]
        },
        // 图表配置
        options: {
            BASE: 'RADAR',
            radar: {
                indicator: 'data.indicator'
            },
            series: [{
                type: 'radar',
                name: '预算 vs 开销（Budget vs spending）',
                data : 'data.series'
            }]
        }
    }
}