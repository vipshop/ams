---
title: Text 文本
---
# Text 文本

> 用于单行文本类型输入和展示

### 基础用法

<ClientOnly>
<field-text-demo blockName="textField1" onlineDemo="https://codepen.io/w3cmark/pen/yLBKKao"/>
</ClientOnly>

### 禁用状态

<ClientOnly>
<field-text-demo blockName="textField2" onlineDemo="https://codepen.io/w3cmark/pen/ExYpeLO"/>
</ClientOnly>

### 可清空

<ClientOnly>
<field-text-demo blockName="textField3" onlineDemo="https://codepen.io/w3cmark/pen/ZEzjMqR"/>
</ClientOnly>

### 带 icon 的输入框
<ClientOnly>
<field-text-demo blockName="textField4" onlineDemo="https://codepen.io/w3cmark/pen/BaBPOGp"/>
</ClientOnly>

### 带校验规则

<ClientOnly>
<field-text-demo blockName="textField5" onlineDemo="https://codepen.io/w3cmark/pen/jONpvQa"/>
</ClientOnly>

### 展示状态下后面追加提示icon

<ClientOnly>
<field-text-demo blockName="textField6" onlineDemo="https://codepen.io/w3cmark/pen/yLLyKmW"/>
</ClientOnly>

### slots插槽

<ClientOnly>
<field-text-demo blockName="textField7"/>
</ClientOnly>

### 配置参数

| 参数 | 类型（可选值） | 必填 | 说明
| -- | -- | -- | --
| type | string | 是 | 字段类型
| label | string | 否 | 标签文本
| ctx | `edit`, `view` | 否 | `edit` 为编辑态，`view` 为展示态，不配置则使用当前block的ctx
| default | string, number | 否 | 默认值
| labelWidth | string | 否 | 在form和object内生效，可单独指定当前field的标签文本所占的宽度
| info | string | 否 | 如配置会在标签处展示tooltip提示
| desc | string | 否 | 如配置会在ctx为`edit`状态下固定显示在表单项下面
| hidden | null, boolean | 否 | 默认为`false`，配置为true则改表单项会隐藏
| show | string, object, function | 否 | 配置后只有满足指定的条件后才显示，实现对目标条件的依赖联动
| show.name | string | 否 | 目标字段名
| show.value | string, number | 否 | 目标字段值
| rules | null, array | 否 | 可以配置多条校验规则，会在form的编辑态通过 `@validate` 来校验，详见 https://github.com/yiminghe/async-validator
| rules[] | object | 否 | 
| rules[].require | boolean | 否 | 是否必填
| rules[].type | `string`, `number`, `boolean`, `method`, `regexp`, `integer`, `float`, `array`, `object`, `enum`, `date`, `url`, `hex`, `email` | 否 | 校验类型
| props | null, object | 否 | 会透传至底层的element-ui组件作为props属性，或者是原生dom元素的属性

<!-- ### 在线实验室
<ClientOnly>
<ams-config name="text" type="field"/>
</ClientOnly> -->

组件更多配置可参考Element：[Input 输入框](http://element-cn.eleme.io/#/zh-CN/component/input)中的Input Attributes
