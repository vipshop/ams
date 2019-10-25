---
Form: Form 表单
---
# Form 表单

### 基础用法

> 默认的编辑状态的表单。可以通过配置 `props['label-width]` 来设置整个 `form` 表单的 `label` 宽度，比如 `props['label-width]: '100px'`。

<ClientOnly>
<block-form-demo blockName="formEditAll"  onlineDemo="https://codepen.io/w3cmark/pen/WNeKaoJ"/>
</ClientOnly>

### 带操作按钮的表单

> 在定义field时也可以通过`rules`配置该字段的校验规则，通过`operations`来配置带按钮的表单（包括提交按钮和取消按钮）

<ClientOnly>
<block-form-demo blockName="formBtton" onlineDemo="https://codepen.io/w3cmark/pen/JjPBmEo"/>
</ClientOnly>

### 带默认值的表单

> 通过`data: {fieldname: 'xxx'}`来配置某个field的默认值，优先级会高于在`resource`里定义field时配置的`default`

<ClientOnly>
<block-form-demo blockName="formData" onlineDemo="https://codepen.io/w3cmark/pen/PoYByWK"/>
</ClientOnly>

### 把表单的某几项显示在同一行

> 通过 `field.props.inline: true` 来配置该field显示占位，如果两个相邻的field都配置 `inline: true`，那么这两个field就会在同一行显示。另外，还可以通过 `field.props.formItemWidth: '200px'` 配置来控制行内field的显示宽度。

<ClientOnly>
<block-form-demo blockName="formLayout" onlineDemo="https://codepen.io/w3cmark/pen/jONpeyp"/>
</ClientOnly>

### 行内表单

> 当垂直方向空间受限且表单较简单时，可以在一行内放置表单。通过 `props.inline: true` 配置来实现。注意：这种是整个表单显示在同一行，直到一行放不下才会换行。

<ClientOnly>
<block-form-demo blockName="formInline" onlineDemo="https://codepen.io/w3cmark/pen/ZEzjqLP"/>
</ClientOnly>

### 展示状态表单

>通过`ctx: 'view'`来配置为纯展示的表单，通常用于只读展示。

<ClientOnly>
<block-form-demo blockName="formViewAll" onlineDemo="https://codepen.io/w3cmark/pen/JjPBmWd"/>
</ClientOnly>

### 分组的表单

> 如果表单太多，还可以插入block来进行分组。配置子block的`slot`为`field:${fieldName}`，可以在某行后插入任意block，如想在 `date` 这个field后面插入`title block`

<ClientOnly>
<block-form-demo blockName="formSlot" onlineDemo="https://codepen.io/w3cmark/pen/mdbjzWm"/>
</ClientOnly>

### 顶部slot block

>配置子block的slot为`top`，可以插入在顶部

<ClientOnly>
<block-form-demo blockName="formSlotTop" onlineDemo="https://codepen.io/w3cmark/pen/wvwxYJy"/>
</ClientOnly>

### 表单键盘enter事件监听

>通过 `on.keyupEnter` 可监听表单输入项中的键盘enter事件触发

<ClientOnly>
<block-form-demo blockName="enterForm" />
</ClientOnly>

### 在线实验室
<ClientOnly>
<ams-config name="form" type="block"/>
</ClientOnly>

