---
Calendar: Calendar 日历看板
---
# Calendar 日历看板

### 安装

#### @ams-team/block-calendar <Badge text="0.1.2"/>
```
npm i --save @ams-team/block-calendar
```

### 预览

<ClientOnly>
<block-calendar-demo blockName="scheduleBlock"/>
</ClientOnly>


### 配置

options配置
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| type | string | 是 | block类型，固定值为`calendar`
| resource | string | 否 | 指定resource
| data | object | 是 | content为日历内容，searchs为搜索条件，year、month为看板展示的year年month+1月的日历
| options | object | 是 | title为标题；draggable表示是否支持数据拖拽
| events | object | 否 | 事件定义
| actions | object | 否 | 自定义actions，可被events中使用
