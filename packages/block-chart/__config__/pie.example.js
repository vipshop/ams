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
        legend: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        xAxis: ['周二', '周二', '周二', '周四', '周五', '周六', '周日'],
        series: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
        ]
    },
    // 图表配置
    options: {
        BASE: 'PIE',
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                data: 'data.series'
            }
        ]
    },
    events: {
        init: '@read'
    }
};
