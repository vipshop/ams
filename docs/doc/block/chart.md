---
Chart: Chart 图表
---
# Chart 图表

## 安装

### @ams-team/block-chart <Badge text="0.1.3"/>

> 依赖开源 `echarts`

```
npm i --save echarts
npm i --save @ams-team/block-chart --registry http://io.tools.vipshop.com/vdc/
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@4.1.0/dist/echarts.min.js"></script>
<script src="http://h5rsc.vipstatic.com/ams/block/block-chart@0.1.3.js"></script>
```

## 结构

```js
export interface Data { [field: string]: any }
export interface ChartBlock {
    type: 'chart',
    resource: string,
    style?: Data,
    data?: Data,
    options: Data,
    events?: Data,
    actions?: { [field: string]: () => any },
    render?: boolean | string
}
```

## 折线图表
<ClientOnly>
<block-chart-line-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-line/block.js

## 柱状图表
<ClientOnly>
<block-chart-bar-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-bar/block.js

## 饼状图表
<ClientOnly>
<block-chart-pie-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-pie/block.js

## 漏斗图表
<ClientOnly>
<block-chart-funnel-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-funnel/block.js

## 散点图表

<ClientOnly>
<block-chart-scatter-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-scatter/block.js

## 雷达图表
<ClientOnly>
<block-chart-radar-demo />
</ClientOnly>

<<< @/fe/.vuepress/components/block/chart-radar/block.js


## 配置

options配置
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| type | string | 是 | block类型，固定值为`chart`
| options | object | 是 | 图表配置，详见[ options ](./api.md#options-chart)
| resource | string | 否 | 指定resource
| style | object | 否 | block添加样式
| data | object | 否 | block数据，详见[ data ](./api.md#data)
| events | object | 否 | 事件定义
| actions | object | 否 | 自定义actions，可被events中使用
| render | boolean | string | 指定渲染方式



<!-- - 定制图表block基于echart插件实现
- 与其他block区别在于新增options配置项，options配置规则同echart配置对应
- 其他机制实现同ams基础block
- 区别：

    1、对options中的数据可使用'data.xxx'字符标识与block.data数据动态绑定

    2、数据变化只需关注block.data，即可实现图表更新 -->
