<p align="center"><a href="https://vipshop.github.io/ams/" target="_blank" rel="noopener noreferrer"><img width="140" src="https://h5rsc.vipstatic.com/ams/ams-logo2.png" alt="AMS logo"></a></p>

## AMS

> AMS (admin material system)，管理后台物料系统。

AMS是基于 [Vue.js](https://github.com/vuejs/vue) 和 [Element组件库](https://github.com/ElemeFE/element)、通过JSON配置来快速搭建管理后台的一整套解决方案

- [使用文档](https://vipshop.github.io/ams/)
- [演示示例](https://vipshop.github.io/ams/example/#/)
- [FAQ相关](./FAQ.md)

## npm 安装

```
npm i @ams-team/ams -S
```

## CDN

目前可以通过 [unpkg.com/@ams-team/ams](https://unpkg.com/browse/@ams-team/ams/lib/) 获取到最新版本的资源，在页面上引入 js 文件即可开始使用。

```html
<!-- 引入ams库 -->
<script src="https://unpkg.com/@ams-team/ams/lib/ams.js"></script>
```

## 快速开始

AMS的核心思想是通过规范数据接口的数据结构，再用类JSON的格式配置对应的 `区块` 和 `资源`，即可渲染成有UI和数据交互的前端界面。

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

### packages目录本地开发调试

```sh
npm run dev
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

尝试AMS的最简单的方式是使用[JSRUN上的官方入门Demo](http://jsrun.net/sehKp/edit?utm_source=website)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。

### packages本地开发调试

```
npm run dev
```



## 浏览器支持

现代浏览器 及 Internet Explorer 10+。

## 1.0版本规划

> 通过 `1.0` 版本调整，希望把ams的配置的更加精简，希望解决一些设计不规范或者在实践中反馈不合理的地方，解决已知的痛点，敬请期待。[点击查看1.0版本规划详情>>](https://github.com/vipshop/ams/milestone/1)

## 本地开发

```bash
npm install
npm run build
npm run dev
```


## 开发团队

来自vip.com的开发者：

+ [bfkkkd](https://github.com/bfkkkd)
+ [w3cmark](https://github.com/w3cmark)
+ [wuzebin](https://github.com/wuzebin)
+ [EdwardQ](https://github.com/EdwardQ)

vip.com以外的开发者：

+ [hodor-cn](https://github.com/hodor-cn)
+ [ly525](https://github.com/ly525)

## 社区互助

<img src="https://vipshop.github.io/ams/index/footer-02.png">

加入技术支持群，请扫二维码加“唯技术”老师咨询（添加时请备注“AMS”）

## LICENSE
[Apache 2.0](LICENSE)
