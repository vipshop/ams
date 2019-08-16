---
Component: Component 动态区块
---
# Component 动态区块

动态block主要用于配置原生节点或者`非block`节点，如 `<a/>` `<img/>` `<div/>` 等元素，如 `<el-tooltip>` 等全局vue组件，方便进行一些布局调整或者是简单的功能；或者是集成自定义组件（要先通过 `Vue.component('test', myComponent)` 注册成全局组件 ）

### 基础用法
一个 `img` 标签
<ClientOnly>
<block-component-demo blockName="defaultComponent"/>
</ClientOnly>

### 插入TEXT和HTML
注意：插入的 `HTML` 会在 `TEXT` 前面。
<ClientOnly>
<block-component-demo blockName="divComponent"/>
</ClientOnly>

### HTML标签和elementUI组件标签组合

一个包含星星评分 `el-rate` 和操作按钮的 `div`。

<ClientOnly>
<block-component-demo blockName="divElComponent"/>
</ClientOnly>

### 在线实验室
<ClientOnly>
<ams-config name="component" type="block"/>
</ClientOnly>
