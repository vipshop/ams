---
Demo: Demo 案例
---
# 案例教程

本页将会手把手教你构建一个SPA单页面应用，涉及区块包含[Router](/block/router.html#/)、[List](/block/list.html)、[Form](/block/form.html)、[Dialog](/block/dialog.html)

## 第一步：配置资源

这一步首先设置[resource](/api/resource.html)，api的接口规范可以查看[接口api规范](/api/api.html#通用数据结构)，这里可以看到设置了用于接口的api和字段的属性fields

<ClientOnly>
<try-demo-spa-demo blockName="demoResource"/>
</ClientOnly>

## 第二步：基础列表

开始配置可以展示的列表页（基础展示）

使用[list](/block/list.html)可以配置一个列表页的区块，这里通过区块list的resource参数名字对应注册resource的名字，即可在list区块中使用字段的属性，所以可以看到表头都是resource的label

这里的[events](/api/action.html)设置了`{ init: '@list' }`。在初始化block时，会自动执行events中的init事件，这里执行的是`@list`，会匹配注册resource中名为`demoResource`中，自动加载`prefix`+`list`的链接，即发送`https://easy-mock.com/mock/5d4a8b0d51c7b6461eb9f898/ams-page-demo/getList`请求，拿到数据后会设置在区块list的`data`中

<ClientOnly>
<try-demo-spa-demo blockName="demoBlock1" onlineDemo="https://codepen.io/w3cmark/pen/GRKdpzo"/>
</ClientOnly>

## 第三步：搜索与删除

搜索的功能需要涉及配置[operations](/api.html#operations)，将`slot`设置为`searchs`，就会展示在搜索栏中。如果搜索项太多可以试试type为`dropdown`的类型

打开控制台，点击删除的时候，实际是从`operations`的`removeItem`中触发动作，会先查找`events`中的同名事件，此时可以找到`"removeItem": "@confirm:确认删除吗? @deleteAction @delete init"`（如果action的方法设置了async则支持同步执行），可以看到会先弹出`确认删除吗?`的弹窗，点击确认后执行`deleteAction`的action，在方法里会同时带上该行数据和前一个方法返回的数据，所以在控制台能捕获到删除的id，然后执行`@delete`方法，会去查找注册resource中配置的delete，匹配结果会发起`https://easy-mock.com/mock/5d4a8b0d51c7b6461eb9f898/ams-page-demo/delete`的请求，最后执行`@init`，也就是刷新列表

<ClientOnly>
<try-demo-spa-demo blockName="demoBlock2" onlineDemo="https://codepen.io/w3cmark/pen/qBWYbWe"/>
</ClientOnly>

## 第四步：新增与编辑

继续完善列表页，让它带有查询、删除按钮、新增按钮、编辑按钮，点击`新增按钮`的时候可以弹出一个空的弹窗，点击`编辑按钮`的时候，可以带上列表的内容。在新增弹窗是，因为没有`id` `create_time` `update_time`三个字段，所以我们用了[fields](/block/api.html#fields)的配置，可以重写注册resource对应的field配置

<ClientOnly>
<try-demo-spa-demo blockName="demoBlock3" onlineDemo="https://codepen.io/w3cmark/pen/KKPRVpo"/>
</ClientOnly>

## 第五步：配置导航

将上面完善的列表放入[导航Router](/block/router.html#/)中，成为导航一个页面，点击首页可加载列表页面

<ClientOnly>
<try-demo-spa-demo blockName="demoBlock4" onlineDemo="https://codepen.io/w3cmark/pen/zYOjrGb"/>
</ClientOnly>