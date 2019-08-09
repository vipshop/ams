---
Component: Component 动态区块
---
# Component 动态区块

动态block主要用于配置原生节点或者`非block`节点，如 `<a/>` `<img/>` `<div/>` 等元素，如 `<el-tooltip>` 等全局vue组件，方便进行一些布局调整或者是简单的功能；或者是集成自定义组件（要先通过 `Vue.component('test', myComponent)` 注册成全局组件 ）

## 在线配置
<ClientOnly>
<ams-config name="component" type="block"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<block-component-demo />
</ClientOnly>

## 示例代码
<<< @/fe/.vuepress/components/block/component/block.js