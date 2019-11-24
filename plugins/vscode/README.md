# ams-helper

用于唯品会官方开源项目 [AMS](https://github.com/vipshop/ams) 开发时的插件（vscode版本>=1.27.0），可极速提高编码效率，目前集成了以下功能

## 自动补全

支持补全的文件格式为javascript / html，选中后按TAB键自动生成代码片段，支持语法如下

- `ams.curd`（仅支持html格式）
- `ams.simple`（仅支持html格式）
- `import ams`
- `ams.内置方法或属性`（[>>所有支持的语法链接](https://vipshop.github.io/ams/api/ams-ams.html)）
- `ams.utils.内置方法或属性`（[>>所有支持的语法链接](https://vipshop.github.io/ams/api/ams-utils.html)）
- `ams.字段名`（[>>所有支持的字段链接](https://vipshop.github.io/ams/field/)）
- `ams.区块名`（[>>所有支持的区块链接](https://vipshop.github.io/ams/block/)）

![](https://h5rsc.vipstatic.com/ams-plugins/images/snippets.png)

## 悬停提示

支持补全的文件格式为javascript，将鼠标放在下面格式上会出现文档链接的提示，点击悬浮框的提示链接可以自动跳转到对应文档，支持语法如下

- `ams.resource`
- `ams.block`
- `type: 字段名或者区块名`（仅支持@ams-team/ams内部组件）

![](https://h5rsc.vipstatic.com/ams-plugins/images/hover.png)