# AMS定制的element-ui主题: vipshop

## 在线演示

[https://vipshop.github.io/ams/example](https://vipshop.github.io/ams/example/)

## 使用

+ 直接用 script 引入（注意版本号）

```html
<!-- 正常使用 element-ui -->
<!-- <link rel="stylesheet" href="https://unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css"/> -->

<!-- 如果要改成使用vipshop定制UI主题 -->
<link rel="stylesheet" href="https://h5rsc.vipstatic.com/ams/theme-vipshop@0.18.0/index.css"/>
```

+ 通过NPM安装 `@ams-team/ams` 后使用

```js
// 正常使用 element-ui 默认主题
// import 'element-ui/lib/theme-chalk/index.css';

// 如果要改成使用 vipshop 定制主题
import '@ams-team/ams/lib/theme-vipshop/index.css';
```
## 本主题打包构建

```sh
# 安装依赖
npm i

# 打包
npm run build
```

## 再次编辑主题

把根目录的config.json上传到 element在线主题编辑（https://element.eleme.cn/#/zh-CN/theme），修改完再下载即可。

```sh
|- src
|-- fonts // element下载包里的fonts文件夹
|-- base.scss // element下载包里的index.css文件改名
|-- router.scss // 定制的路由菜单主题
|-- index.scss // 主题的入口文件
|- config.json // element主题配置文件，可用于再次编辑和保存
```