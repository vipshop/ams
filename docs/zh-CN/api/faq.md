# FAQ

### 已经用其他框架开发的项目，如何半途接入？
:::tip
AMS底层依赖是`Vue.js`，而AMS里的区块（block）概念本质就是封装好的Vue组件。接入及剥离都是以组件为单位，对其它代码没有过多侵入性。

第一种情况：在一个已经写好的Vue.js的页面里，可以像插入普通组件的方式在某个位置接入AMS区块的：[使用block](/api/block.html#使用-block)

第二种情况：如果在非Vue.js项目接入，支持以单独新页面的方式接入AMS。但是如果想在原有的页面去改造某一块功能或新增一块功能，结果不确定，要看具体接入案例。

包含普通Vue、ncform和AMS组成的在线Demo演示：[点击查看Demo](https://jsbin.com/nizuvigije/1/edit?html,output)
:::

### Vue的组件如何整合？本来是Vue的配置，能否部分页面接入ams?
:::tip
AMS里的区块（block）概念本质就是封装好的Vue组件，可以参考：[使用block](/api/block.html#使用-block)
:::

### 同名ams的block如何检测
:::tip
AMS的区块都是通过name来注册和使用的，和其它Vue组件一样，名字成为唯一标识。如果同一个项目里出现名字重复的组件就会发生重复冲突警告。
:::

### 如果新开项目都是用ams开发，需要在部分页面使用外部系统页面，如何处理？
:::tip
可以使用[component](/block/component.html)区块注册一个iframe，设置src为外部页面的url，即可接入
:::
示例如下：
```js
iframeBlock: {
  type: 'component',
  options: {
    is: 'iframe'
  },
  props: {
    src: 'http://xxx.vip.com/id=11',
    frameborder: 0
  }
}
```

### 表格是否可以接入ncform类似产品?
:::tip
`ncform`的底层依赖和AMS一样，都是`Vue.js`和`Elemen-UI`，而`ncform`也是以Vue的组件方式插入Vue的项目中，也和AMS一样。所以分两种情况接入：

（1）`ncform`和`ams-block`都以独立的组件方式插入到同一个页面，各自独立工作（比如用`ams-block`搭建一个列表，用`ncform`搭建一个表单），是没有问题的。

（2）如果想在`ams-block`组件里插入一个`ncform`（比如，`ams-block`开发了一个弹窗，然后想在弹窗里面放一个`ncform`表单），这种方式暂时不支持。

结论：`ncform`只是实现比较较单一的表单功能，作为独立工作和AMS互不影响。但是如果想要AMS完全兼容它的配置融合在一起相互作用，感觉没必要。原因：`ncform`并不是一个很流行的产品（其实只是一个Vue组件），而且配置也说不上简单易用，AMS的简单配置可以达到同样的功能。硬要AMS兼容ncform反而增加用户上手成本（需要额外学习`ncform`）和增加AMS的复杂度，除非未来真有大量用户需求。
:::

### 底层是否有支持React/Angular的计划？
:::tip
目前AMS底层以Vue为主，考虑到即将发布的`Vue3.0`提供的`Function-based API`跟`AMS`的action思维结合的更好，考虑会优先支持Vue3.0+typescript，其他框架如React和Augular看用户使用规模和市场需求再做计划
:::