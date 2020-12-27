import ams from '@ams-team/ams';

ams.block('chart-demo2', {
    blocks: {
        chartBlock: {
            // 类型
            type: 'chart',
            // 样式
            style: {
                width: '100%',
                height: '500px',
                display: 'block'
            },
            // 数据
            data: {
                xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                series: [
                    { data: [120, 132, 101, 134, 90, 230, 210] },
                    { data: [122, 122, 112, 164, 130, 126, 321] },
                    { data: [120, 132, 101, 134, 90, 230, 210] }
                ]
            },
            props: {
                chartDom: true
            },
            // 图表配置--参照echarts的options配置
            options: {
                BASE: 'BAR',
                series: 'data.series'
            }
        },
        rerenderBlock: {
            type: 'component',
            style: {
                margin: '0 0 0 101px'
            },
            operations: {
                rerenderType: {
                    type: 'button',
                    label: '重绘图表'
                },
                hideButton: {
                    type: 'button',
                    label: '隐藏'
                },
                showButton: {
                    type: 'button',
                    label: '显示'
                }
            },
            actions: {
                rerenderType: function() {
                    const result = [...Array(Math.floor((Math.random() + 1) * 3)).keys()].map(item =>
                        ({
                            data: [120, 132, 101, 134, 90, 230, 210].map(Math.random)
                        })
                    );
                    ams.$blocks.chartBlock.chartDom.setOption({}, true);
                    ams.$blocks.chartBlock.setBlockData({
                        series: result
                    });
                },
                hideButton() {
                    ams.$blocks.chartBlock.block.style.display = 'none';
                },
                showButton() {
                    ams.$blocks.chartBlock.block.style.display = 'block';
                }
            }
        }
    }
});
