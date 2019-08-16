const blockConfig = {
    blocks: {
        echartBarBlock: {
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
            },
            events: {
                // init: '@read'
            }
        }
    }
}

export default blockConfig
