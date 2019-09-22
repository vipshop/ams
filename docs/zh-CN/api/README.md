# 介绍

## AMS 是什么

AMS 是 `Admin Materials System` 的首字母缩写，意为管理后台物料系统，是基于JSON配置来快速搭建管理后台前端页面的JavaScript框架。

AMS 目前提供以下能力：

- 通过 `@ams-team/ams` 基础库，提供通过配置生成整个后台的能力，包含数据读取、数据展示、数据编辑、数据列表、数据校验等基本功能
- 通过 `@ams-team/cli` 工具，提供快速搭建项目脚手架、编写定制模块、发布管理定制模块等功能。可前往查看[编写定制物料>>](/api/custom.md)

::: tip
AMS假设你已经对其依赖的[Vue前端框架](https://cn.vuejs.org/v2/guide/)和[Element组件库](https://element.eleme.cn/#/zh-CN)有一定了解。如果还没，建议先去了解一下再来吧！
:::

# 快速起步

## 安装

### 方式一：通过npm安装（依赖node环境）

```sh
npm i --save @ams-team/ams vue element-ui vue-router
```

通过 `Vue.use()` 明确地安装`ams`功能：

```sh
import ams from '@ams-team/ams';

Vue.use(ams);
```

**建议通过我们的[cli工具](/api/cli.html)来创建一个AMS项目！**

### 方式二：直接用 script 引入

> 注意，需要先引入`Vue.js`、`element-ui`的依赖


```html
<!-- Vue.js -->
<script src="https://unpkg.com/vue"></script>

<!-- element-ui -->
<script src="https://unpkg.com/element-ui@2.11.1"></script>
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css"/>

<!-- 引入ams库 -->
<script src="https://unpkg.com/@ams-team/ams/lib/ams.js"></script>
```

尝试AMS的最简单的方式是使用[JSRUN上的官方入门Demo](http://jsrun.net/sehKp/edit?utm_source=website)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。

## 使用

AMS的核心思想是通过[规范数据接口](/api/api.html#read：读取单条数据)的数据结构，再用类JSON的格式配置对应的 `区块` 和 `资源`，即可渲染成有UI和数据交互的前端界面。

<ClientOnly>
<scrimba href="https://scrimba.com/c/cmkya6Tp" />
</ClientOnly>

### 第一步，注册资源

```javascript
ams.resource('demoRes', { // ”demoRes“为资源名
    api: {
        prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/', // 接口前缀
        update: 'update', // 更新表单数据，值为更新接口的path，和接口前缀组成最终请求的url
        read: 'read', // 读取表单数据，值为读取接口的path
    },
    fields: { // 字段
        id: { // “id”为字段名
            type: 'text', // 字段类型
            label: '文本' // 该字段显示在页面的文本标签
        },
        testRate: {
            type: 'rate',
            label: '评分'
        },
        testTextarea: {
            type: 'textarea',
            label: '评语'
        }
    }
})
```

### 第二步，注册区块


```javascript
ams.block('demo', { // “demo”为区块名
    type: 'form', // 区块类型，“form”代表表单类型
    ctx: 'edit', // 状态，“edit”代表为可编辑
    resource: 'demoRes', // 该区块挂载的资源
    operations: { // 操作
        submit: { // 操作触发的事件名
            type: 'button', // 操作类型
            label: '提交' // 操作按钮显示的文案
        }
    },
    events: { // 事件流
        init: '@read', // “read”是内置的读取数据操作
        submit: '@update' // “update”是内置的更新数据操作
    }
});
```

### 第三步，渲染区块

```javascript
// 渲染名字为“demo”的区块
ams.render('demo')
```
<ClientOnly>
<demo-start blockName="quickStart" />
</ClientOnly>

我们已经成功完成了第一个AMS应用的配置了，通过简单的配置，不需要写UI和复杂的逻辑代码，就可以搭建出具备了数据读取、数据展示、数据编辑等基本功能的表单页面。

点击查看 [案例教程](/api/demo.html)，带你搭建一个包含菜单的完整AMS系统应用。