---
Chart: Chart 图表
---
# Chart 图表

### 安装

#### @ams-team/block-chart <Badge text="0.2.0"/>

> 依赖开源 `echarts`

```sh
npm i --save echarts
npm i --save @ams-team/block-chart
```

#### 使用

```js
// 引入图表区块
import chart from '@ams-team/block-chart';
// 可以单独引入唯品会定制主题使用 v0.2.0+
import '@ams-team/block-chart/lib/theme/vipshop.js';
Vue.use(chart);

// ams配置
const amsConfig = {
    type: 'chart',
    options: {
        theme: 'vipshop', // 配置使用唯品会定制主题，默认使用的主题是echart官方的macarons
    }
}
```

#### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/echarts@4.1.0/dist/echarts.min.js"></script>
<script src="http://h5rsc.vipstatic.com/ams/block/block-chart@0.2.0.js"></script>
```

### 结构

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

### 折线图表

<ClientOnly>
<block-chart-demo blockName="chartLine" onlineDemo="https://codepen.io/w3cmark/pen/JjjEPGw"/>
</ClientOnly>

### 柱状图表

<ClientOnly>
<block-chart-demo blockName="chartBar" onlineDemo="https://codepen.io/w3cmark/pen/VwwPZao"/>
</ClientOnly>

### 饼状图表

<ClientOnly>
<block-chart-demo blockName="chartPie" onlineDemo="https://codepen.io/w3cmark/pen/xxxgKOm"/>
</ClientOnly>

### 漏斗图表

<ClientOnly>
<block-chart-demo blockName="chartFunnel" onlineDemo="https://codepen.io/w3cmark/pen/gOOgYwP"/>
</ClientOnly>

### 散点图表

<ClientOnly>
<block-chart-demo blockName="chartScatter" onlineDemo="https://codepen.io/w3cmark/pen/JjjEPRx"/>
</ClientOnly>

### 雷达图表

<ClientOnly>
<block-chart-demo blockName="chartRadar" onlineDemo="https://codepen.io/w3cmark/pen/xxxgKRM"/>
</ClientOnly>


### 参数列表

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
