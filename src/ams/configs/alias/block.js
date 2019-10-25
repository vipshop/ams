// blocks
export const LIST = {
    type: 'list'
};

// 折线图
export const LINE  = {
    // 图表的类型
    type: 'line',
    tooltip: {
        show: true,
        trigger: 'axis'
    },
    legend: {
        data: 'data.legend'
    },
    xAxis: {
        data: 'data.xAxis'
    }
};
// 柱状图
export const BAR = {
    type: 'bar',
    tooltip: {
        show: true,
        trigger: 'axis'    // 触发类型, axis 坐标轴触发
    },
    legend: {
        data: 'data.legend'
    },
    xAxis: {
        data: 'data.xAxis'
    }
};
// 饼状图
export const PIE = {
    type: 'pie',
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        // orient: 'vertical',
        // x: 'left',
        data: 'data.legend'
    }
};
// 漏斗图
export const FUNNEL = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}%'
    },
    // toolbox: {
    //     feature: {
    //         dataView: { readOnly: false },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    legend: {
        data: 'data.legend'
    }
};
// 散点图
export const SCATTER = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        // right: 10,
        data: 'data.legend'
    },
    // xAxis: {
    //     scale: true
    // },
    // yAxis: {
    //     scale: true     // y轴不会强制包含零刻度，在双数值轴的散点图中比较有用
    // }
};
// 雷达图
export const RADAR = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        data: 'data.legend',
        // right: 0
    },
    // 雷达图坐标系, 每一个轴（indicator 指示器）都是一个单独的维度
    // radar: {
    //     name: {
    //         textStyle: {
    //             // color: '#fff',
    //             // backgroundColor: '#999',
    //             borderRadius: 3,
    //             padding: [3, 5]
    //         }
    //     }
    // }
};