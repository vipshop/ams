---
Chart: Chart 图表
---
# options 配置

## 描述 <Badge text="chart独有"/>
- options为图表block的主要配置项对象

## type
- 描述：图表展示类型
- 类型：`string`
- 可选值：`line`、`bar`、`pie`

## title
- 描述：图表的标题和副标题
- 类型：`object`
- 默认值：`{}`

```js
title: {
    text: '图表主标题',
    subtext: '图表副标题'
}
```

## legend
- 描述：图例组件
- 类型：`object`
- 默认值：`{}`

```js
legend: {
    data: 'data.legend' // 可动态指向block.data.legend数据，虽其变化而变化
    data: ['邮件营销','联盟广告'] // 也可固定数据
}
```

## xAxis
- 描述：直角坐标系中的 x 轴
- 类型：`object`
- 默认值：`{}`

```js
xAxis: {
    type: 'category',       // 默认为category/类目轴，value/数值轴，time/时间轴
    data: 'data.xAxis'      // 可动态指向block.data.xAxis数据，虽其变化而变化
    data: [["周一", "周二", "周三", "周四", "周五", "周六", "周日"] // 也可固定数据
}
```


## yAxis
- 描述：直角坐标系中的 y 轴
- 类型：`object`
- 默认值：`{}`

```js
yAxis: {
    type: 'value',       // 默认为value/数值轴，category/类目轴，time/时间轴
    data: 'data.yAxis'      // 可动态指向block.data.xAxis数据，随其变化而变化
    data: [["周一", "周二", "周三", "周四", "周五", "周六", "周日"] // 也可固定数据
}
```

## tooltip
- 描述：图表提示框
- 类型：`object`
- 默认值：`{}`

```js
tooltip: {
    trigger: 'axis',       // 触发类型默认为item/数据项图形触发，axis/坐标轴触发，none/不触发
    triggerOn: 'mousemove', // 提示框触发的条件 mousemove | click | none
}
```
## series
- 描述：图表数据列表
- 类型：`array`
- 默认值：`[]`

```js
series: [
    {
        type: 'line',   // 决定当前数据图表类型，默认会取options.type
        name: '邮件营销', // 数据名称， 可用于tooltip的显示，legend 的图例筛选
        symbol: 'circle',     //标记的图形, 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        symbolSize: 4,
        data: 'data.series1'    // 图标具体的数据项，可动态指向block.data.series1数据，虽其变化而变化
    },
    {
        type: 'bar',   // 决定当前数据图表类型，默认会取options.type
        name: '联盟广告', // 数据名称， 可用于tooltip的显示，legend 的图例筛选
        symbol: 'circle',     //标记的图形, 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        symbolSize: 4,
        data: [220, 182, 191, 234, 290, 330, 310]    // 也可固定数据
    }
]
```

