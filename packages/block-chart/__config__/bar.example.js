import '../src/theme/vipshop.js';
export default {
    type: 'chart',
    theme: 'vipshop',
    style: {
        width: '700px',
        height: '600px',
        position: 'relative'
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
        series1: [120, 132, 101, 134, 90, 230, 210],
        series2: [220, 182, 191, 234, 290, 330, 310]
    },
    // 图表配置
    options: {
        BASE: 'BAR',
        // 图例
        series: [
            {
                name: '邮件营销',
                stack: '总量',
                data: 'data.series1'
            }
        ]
    },
    events: {
        init: '@read'
    },
    blocks: {
        divTop: {
            type: 'component',
            slot: 'top',
            operations: {
                change: {
                    type: 'button',
                    label: '改变数据',
                    props: {
                        size: 'mini',
                        type: 'primary'
                    }
                }
            },
            style: {
                position: 'absolute',
                width: '100%',
                height: '50px',
                padding: '20px',
                zIndex: 5,
                backgroundColor: 'yellow'
            },
            actions: {
                change() {
                    // this.change
                    ams.$blocks.bar.setBlockData({
                        xAxis: [1, 2, 3, 4, 5, 6, 7]
                    });
                    // ams.$blocks.bar.data.xAxis = [1,2,3,4,5,6,7]
                }
            }
        }
    }
};
