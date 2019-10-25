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
        legend: ['邮件营销', '联盟广告'],
        xAxis: ['周二', '周二', '周二', '周四', '周五', '周六', '周日'],
        series1: [120, 132, 101, 134, 90, 230, 210]
    },
    // 图表配置
    options: {
        BASE: 'LINE',
        // 'xAxis': {
        //     'axisLine': {
        //         'show': false
        //     }
        // },
        'xAxis': {
            'boundaryGap': false
        },
        series: [
            {
                name: '邮件营销',
                stack: '总量',
                data: 'data.series1'
            },
            {
                name: '联盟广告',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    },
    events: {
        init: '@read'
    }
};
