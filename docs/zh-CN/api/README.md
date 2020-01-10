# AMS介绍

## 产生背景

每当新做一个后台管理系统，无论如何，前端开发同学都要干这些事：

* 框架选型
* 初始化脚手架（比如使用vue-cli等）、也可能你选择了开源脚手架，克隆仓库
* 四处找轮子
* 安装各种依赖
* 新建页面，写逻辑
* 设计菜单、路由
* 新建页面的时候复用之前的页面代码
* 新的页面注册菜单、路由
* 做完了这个页面做下个，新建页面，复制代码，注册菜单、路由......
  
**想要更简单、更高效吗？**

**请使用AMS！**

## 是什么

**AMS**是Admin Material System首字母的缩写，意为管理后台物料系统。它是基于JSON配置来快速搭建管理后台前端页面的前端框架。
它的初衷：是帮助开发同学，快速构建后台管理系统页面。使用它，你可以不需要搭建复杂的前端开发环境，就能快速构建前端页面。
::: tip
AMS由唯品会大前端团队发起，底层基于 [vue2.x](https://cn.vuejs.org/v2/guide/) 和 [element2.x](https://element.eleme.cn/#/zh-CN) 开发，目前已在唯品会内部20+的系统中使用
:::

## 相关概念

AMS体系中，有几个概念：**物料，字段，区块，模板**

**物料**是组成一个前端项目的不同单位，根据抽象粒度的不同，将物料从小到大依次抽象为：字段 -> 区块 -> 模版

* **字段**：页面的基本组成单元，例如：文本框、按钮等（tip：我们将描述接口的字段组成以及请求配置参数，叫做`资源`）[>> 详情](/api/resource.html)
<!-- 红色的搜索按钮可以理解为字段； -->
* **区块**：若干字段与交互组成的功能单元，例如：常用的Form表单、表格List列表等 [>> 详情](/api/block.html)
<!-- 黄色的列表内容可以理解为区块； -->
* **模板**：若干区块与交互组成、满足某些特定功能的页面及页面的集合，例如：满足某个特定功能场景的增删改查页面，整个页面可以理解为模板 [>> 详情](/market/)

## 提供能力

目前提供以下能力：

* `@ams-team/ams` AMS核心库，提供通过配置生成整个后台的能力，包含数据读取、数据展示、数据编辑、数据列表、数据校验等基本功能
* `@ams-team/field-*` AMS扩展字段库，在核心库提供的字段之外的扩展字段
* `@ams-team/block-*` AMS扩展区块库，在核心库提供的区块之外的扩展区块
* `@ams-team/cli` 工具，提供快速搭建项目脚手架、编写定制模块、发布管理定制模块等功能 [>> 详情](/api/cli.html)
* `vscode/ams-helper` vscode编辑器用于AMS开发时的插件 [>> 详情](https://marketplace.visualstudio.com/items?itemName=wuzebin.ams-helper)
* `主题风格` 提供多种主题风格，按公司UED部门的设计规范标准，统一了后台管理系统页面的各种UI组件样式 [点击预览](https://vipshop.github.io/ams/example/index.html)
* `扩展图标` 在element-ui提供的[Icon 图标](https://element.eleme.cn/#/zh-CN/component/icon)之外，我们还提供了UED出品的[扩展图标](/api/icon.html)满足不同需求

:::tip
所有AMS开发的组件可以通过 [npm @ams-team](https://www.npmjs.com/search?q=%40ams-team) 查看
:::

## 使用方式

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

## 接入说明

为了规范与后端接口的对接工作，AMS拟定了一套[接口api规范](/api/api.html)，建议后端接口尽量按照此规范来对接

系统需要对接AMS时，我们提供了多种的[接入方式](/api/access.html#已有项目嵌入ams)

接下来，就让我们试一试，通过AMS提供的模板来快速生成页面吧

[下一节：试一试](/api/try.html)
