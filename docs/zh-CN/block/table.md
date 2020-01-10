---
Table: Table 表格
---
# Table 表格

大部分功能同list一致，增加了`展开行/子表`、`合并行`、`表头配置`等功能

### 基础用法
<ClientOnly>
<block-table-demo blockName="defaultTable" onlineDemo="https://codepen.io/w3cmark/pen/VwZBEQP"/>
</ClientOnly>

### 结构

```js
export interface Data { [field: string]: any }
export interface FormBlock {
    type: 'table',
    resource: string,
    ctx: 'edit' | 'view',
    pageSize?: number,
    filters?: { [field: string]: {
      multiple?: boolean,
      remote?: boolean
    }},
    fields?: { [field: string]: Data | false },
    sorts?: { [field: string]: boolean },
    style?: Data,
    data?: Data,
    events?: Data,
    actions?: { [field: string]: () => any },
    options?: Data,
    operations?: { [field: string]: Data },
    render?: boolean | string
}
```

### 配置
> 补充：如果需要实现固定列需求，请参见：[设置固定列](https://github.com/vipshop/ams/issues/101)

可用配置项表
| 参数 | 类型 | 是否必填 | 说明
| -- | -- | -- | --
| type | string | 是 | block类型，固定值为`table`
| resource | string | 否 | 指定resource
| ctx | string | 否 | 表单的显示类型
| style | object | 否 | block添加样式
| data | object | 否 | block为table时，参考list的data数据要求，详见[`data`](./api.md#data)
| events | object | 否 | 事件定义
| actions | object | 否 | 自定义actions，可被events中使用
| fields | object | 否 | block级别作用域的fields，重置resource中的默认配置
| options | object | 是 | table配置,内有`span-merge`、`expand-row`、`table-column`配置
| `expand-row` | object | 否 | 展开行/子表配置
|  `span-merge` | object | 否 | 合并行配置，设置对应的行的field为`true`, 自动合并相同行表格
| `table-column` | array | 否 | 表头配置, 数组格式，多级表头用children嵌套
| operations | object | 否 | 操作项配置
| blocks | object | 否 | 嵌套的blocks
| render | boolean | string | 指定渲染方式
| filters | object | 否 | 过滤条件 同`列表`
| sorts | object | 否 | 列表排序设置 同`列表`
| searchs | object | 否 | 列表搜索设置 同`列表`
| searchsOptions | object | 否 | 列表的搜索栏操作项设置 同`列表`
| pageSize | number | 否 | 设置分页每页的条数 同`列表`
