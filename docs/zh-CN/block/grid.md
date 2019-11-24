---
Grid: Grid 网格布局
---
# Grid 网格布局

>用于网格布局，默认是一行n列（n是由该网格区块的blocks个数决定，每列的宽度是平分），可以通过设置行数（`grid-template-rows`）和列数(`grid-template-columns`)来覆盖；默认行间距、列间距都是`20px`

### 基础用法

> 一行两列，列间距为0，是通过设置`style: {'grid-gap': '0px'}`控制

<ClientOnly>
<block-grid-demo blockName="defaultGrid" onlineDemo="https://codepen.io/w3cmark/pen/eYOjPWo"/>
</ClientOnly>

### 指定列的内容为某种区块

> 一行两列，列间距20px，每一列是一个卡片类型的区块。

<ClientOnly>
<block-grid-demo blockName="cardCloumnGrid" onlineDemo="https://codepen.io/w3cmark/pen/JjPBmJd"/>
</ClientOnly>

### 如何兼容不支持grid布局的浏览器？<Badge text="0.20.7+"/>

不支持grid布局时，ams会把子项按照`inline-block`展示，所以通过给子项配置单独的样式：`width` 和 `height`。

<ClientOnly>
<block-grid-demo blockName="unsupportGrid" onlineDemo="https://codepen.io/w3cmark/pen/qBBQbJW"/>
</ClientOnly>

### 一行三列

> 这个三列默认是由它的子区块blocks个数

<ClientOnly>
<block-grid-demo blockName="grid3" onlineDemo="https://codepen.io/w3cmark/pen/RwbBegp"/>
</ClientOnly>

### 一行两列，宽度不等分

> 第一列占三分之一，第二列占三分之二

<ClientOnly>
<block-grid-demo blockName="grid4" onlineDemo="https://codepen.io/w3cmark/pen/BaBPqZJ"/>
</ClientOnly>

### 两行两列

> style配置里由两个参数可以设置行数（`grid-template-rows`）和列数(`grid-template-columns`)，然后每个网格里面继续使用更复杂的网格布局

<ClientOnly>
<block-grid-demo blockName="grid5" onlineDemo="https://codepen.io/w3cmark/pen/XWrBxgv"/>
</ClientOnly>


