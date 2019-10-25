import '../src/theme/vipshop.js';
export default {
    type: 'chart',
    theme: 'vipshop',
    style: {
        width: '700px',
        height: '500px'
    },
    resource: {
        api: {
            // api前缀
            prefix:
                        'https://www.easy-mock.com/mock/5bf25b2b34392218c898a5fd/',
            // 读取数据接口
            read: 'read',
        }
    },
    data: {
        legend: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
        series: [
            {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
            },
            {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }
        ],
        indicator: [
            { name: '销售（sales）', max: 6500 },
            { name: '管理（Administration）', max: 16000 },
            { name: '信息技术（Information Techology）', max: 30000 },
            { name: '客服（Customer Support）', max: 38000 },
            { name: '研发（Development）', max: 52000 },
            { name: '市场（Marketing）', max: 25000 }
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
            data: 'data.series'
        }]
    },
    events: {
        init: '@read'
    },
    blocks: {
        div: {
            type: 'component',
            options: {
                is: 'div',
                text: 'block-bottom'
            },
            style: {
                height: '30px',
                fontSize: '20px',
                textAlign: 'center'
            }
        },
        div2: {
            type: 'component',
            slot: 'top',
            options: {
                is: 'div',
                text: 'block-top'
            },
            style: {
                padding: '20px',
                backgroundColor: 'red'
            }
        }
    }
};
