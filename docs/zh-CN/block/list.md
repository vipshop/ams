---
List: List 列表
---
# List 列表

### 基础用法

纯列表，数据是通过`data`静态配置的

<ClientOnly>
<block-list-demo blockName="defaultList" onlineDemo="https://codepen.io/w3cmark/pen/YzKjJxN"/>
</ClientOnly>

### 空数据时显示的文本

默认显示 `暂无数据`，可以通过 `props['empty-text']` 配置

<ClientOnly>
<block-list-demo blockName="emptyList" onlineDemo="https://codepen.io/w3cmark/pen/PoYezzY"/>
</ClientOnly>

### 索引行号<Badge text="0.9.1+"/>

通过设置`props.type: 'index'` 可以实现在每行显示索引行号。

<ClientOnly>
<block-list-demo blockName="indexList" onlineDemo="https://codepen.io/w3cmark/pen/xxKJyXG"/>
</ClientOnly>

### 带分页的列表

默认是通过接口实现的分页：是否显示分页由[列表接口](/api/api.html#常用的接口)返回的`total`字段决定，当接口没有返回该字段或者该字段返回0，则不显示分页。如果不需要分页的场景可以利用此特性。分页时默认是20条一页，可通过`pageSize`和接口配合来改变。

另外，数据如果是通过接口获取，记得主动在 [`events`](/api/block.html#events) 里的 `init` 调一下 `@list`

<ClientOnly>
<block-list-demo blockName="pagesList" onlineDemo="https://codepen.io/w3cmark/pen/OJLwBxz"/>
</ClientOnly>

### 纯前端分页

通过前端实现的模拟分页：接口一次性返回所有数据，前端通过`pageSize`设置每页显示的条数，然后设置`props['pagination']: 'simulate'`。

<ClientOnly>
<block-list-demo blockName="simulatePagesList" onlineDemo="https://codepen.io/w3cmark/pen/ZEzjqXZ"/>
</ClientOnly>

### 表头带排序和筛选的列表

> 这两个功能是通过接口来实现真实排序和筛选的，下面例子是模拟接口，看不到排序和筛选后的效果。

配置在 `sorts` 内的字段可以支持排序，排序变更时会触发 `list` action并携带对应的排序参数。

配置在 `filters` 内的字段可以支持过滤，可以通过 `multiple` 控制是否支持多选，如果 `remote` 配置为false、则会使用默认的字符串过滤并且不会请求接口（如果要自定本地过滤请使用props透传），当 `remote` 为true时，选择的过滤结果将携带在参数上并会发起新的请求刷新列表。

如果没有配置会使用同名 `field` 的 `props.options` 配置，如果都没有filter配置会失效

若配置`props['pagination']: 'simulate'`的纯前端分页，也支持排序

<ClientOnly>
<block-list-demo blockName="filtersList" onlineDemo="https://codepen.io/w3cmark/pen/zYOLmPO"/>
</ClientOnly>

### 搜索配置 <Badge text="0.5.0+"/>

::: tip
注意：在 `ams@0.5.0` 以前的版本是通过配置 `searchs` 和 `searchsOptions` 实现的搜索配置，`0.5.0+` 使用新的`operations` + `slot` 实现列表的搜索和多选配置（0.5.0-0.6.0 会兼容searchs和searchsOptions，将在0.6.0+移除兼容支持）
:::
通过配置`slot`为`searchs`可以配置搜索条件，`operations` 配置参考：[operations配置](./deep-operation.md)

<ClientOnly>
<block-list-demo blockName="searchsList" onlineDemo="https://codepen.io/w3cmark/pen/YzKjJEN"/>
</ClientOnly>

### 多选操作配置 <Badge text="0.5.0+"/>

通过配置list 的 `options.multipleSelect` 为 `true` 时可让列表出现多选按钮，配置 `slot` 为 `multipleSelect` 可以配置多选后出现的操作（多选操作只有在选择了至少一行后才会出现），`operations` 配置参考：[operations配置](./deep-operation.md)

<ClientOnly>
<block-list-demo blockName="multipleSelectList" onlineDemo="https://codepen.io/w3cmark/pen/wvwxYPm"/>
</ClientOnly>


### slotBlocks 插槽配置

+ 搜索条顶部：配置子block的slot为`top`，可以插入到搜索条顶部

+ 搜索条和表格之间：配置子block的slot为`tableTop`，可以插入到搜索条和表格之间

<ClientOnly>
<block-list-demo blockName="slotBlocksList" onlineDemo="https://codepen.io/w3cmark/pen/pozZxdq"/>
</ClientOnly>

### 列表每行操作项

可以通过 `props['operations-width']: 200` 来设置操作项那列的宽度。

<ClientOnly>
<block-list-demo blockName="operationsList" onlineDemo="https://codepen.io/w3cmark/pen/JjPBmMG"/>
</ClientOnly>

### 字段后面追加提示icon

+ 结合`field.changeConfig`可以实现根据不同的数据改变追加的提示icon状态和提示文案

<ClientOnly>
<block-list-demo blockName="suffixInfoList" onlineDemo="https://codepen.io/w3cmark/pen/LYYEdoR"/>
</ClientOnly>

### 编辑状态的列表

+ 支持字段之间的联动（设置`field.changeConfig`）：某个字段的状态根据另一个字段的取值发生变化（比如下面demo的`条件`字段会根据`对比`字段发生变化）

<ClientOnly>
<block-list-demo blockName="editList" onlineDemo="https://codepen.io/w3cmark/pen/VwZBEyP"/>
</ClientOnly>

### 在当前列表编辑某些字段

+ 可以`field.changeConfig`实现修改某个字段的 `编辑/展示` 状态，从而实现在当前列表编辑该字段的值

<ClientOnly>
<block-list-demo blockName="editList2" onlineDemo="https://codepen.io/w3cmark/pen/BaBPqJr"/>
</ClientOnly>

### 列表展开表单详细

+ 可通过配置 block.expand 来控制需要展示的表单项(即内部field)，0.18.5+支持

<ClientOnly>
<block-list-demo blockName="expandList" />
</ClientOnly>

### 列表支持拖拽

+ 通过配置list 的 `options.drag` 为 `true` 让列表支持拖拽，可以在 `on.drag-start` 和 `on.drag-end` 事件中监听列表拖拽开始和拖拽结束回调，拖拽完成后会自动更新列表data.list数据顺序，拖拽的位置为默认icon位置拖拽，可通过对指定字段field配置`props['class-name']` 为 `drag-column`实行指定字段(列)的拖拽, 也可配置`options.showDragIcon` 为 `false`隐藏拖拽icon

<ClientOnly>
<block-list-demo blockName="dragList" />
</ClientOnly>

### 列表操作项带标记

+ 通过配置opearations，该配置为operations提供，0.17.12+支持

<ClientOnly>
<block-list-demo blockName="opearationsList" />
</ClientOnly>