# 快速起步

## 安装

### 方式一：通过npm安装（依赖node环境）

相关依赖安装

```js
npm i @ams-team/ams vue element-ui
```

通过Vue.use() 明确地安装ams功能：

```js
// 不要忘了引入 element-ui
import ElementUI from 'element-ui';
// 使用 element-ui 默认主题
import 'element-ui/lib/theme-chalk/index.css';
// 或者使用 vipshop 定制主题
import '@ams-team/ams/lib/theme-vipshop/index.css';

import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
Vue.use(ElementUI, { locale });

// 再引入ams
import ams from '@ams-team/ams';

Vue.use(ams);
```

### 方式二：直接用 script 引入

> 注意，需要先引入Vue.js element-ui的依赖

```html
<!-- Vue.js -->
<script src="https://unpkg.com/vue@2.6.10/dist/vue.min.js"></script>

<!-- element-ui -->
<link rel="stylesheet" href="https://unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css"/>
<!-- 或者使用vipshop定制UI主题 -->
<link rel="stylesheet" href="https://h5rsc.vipstatic.com/ams/theme-vipshop@0.28.0/index.css"/>

<script src="https://unpkg.com/element-ui@2.11.1/lib/index.js"></script>

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
        prefix: '//www.yournana.club/vipshop/', // 接口前缀
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
<demo-start blockName="quickStart" onlineDemo="https://codepen.io/w3cmark/pen/bGbMVQq"/>
</ClientOnly>

我们已经成功完成了第一个AMS应用的配置了，通过简单的配置，不需要写UI和复杂的逻辑代码，就可以搭建出具备了数据读取、数据展示、数据编辑等基本功能的表单页面，接下来开始进入AMS核心概念`资源`的介绍。

[下一节：资源](/api/resource.html)
