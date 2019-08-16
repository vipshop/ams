const blockConfig = {
    blocks: {
        echartFunnelBlock: {
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
        }
    }
}

export default blockConfig
