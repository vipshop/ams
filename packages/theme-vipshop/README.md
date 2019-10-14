# vipshop定制的element-ui主题

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