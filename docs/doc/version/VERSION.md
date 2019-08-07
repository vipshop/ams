# 版本总览

![version](../assets/version.png)
## 0.8.5（2019.7.9）
- feat: `field-file`、`field-video`、`field-audio`增加对按钮的文案 `button-label` 和 `size` 配置支持
- feat: `block-list` 增加对 `align` 配置支持
- fix: 调整 `field-array` 类型在表格里的行高

## 0.7.0（2019.4.22）
- feat: 更新element-ui至2.7.2，更新vue至2.6.10

## 0.6.3（2019.4.3）
- feat: block内可以通过config选项配置全局配置
- feat: text、textarea支持显示折叠配置
- feat: 调整operations行间距
- feat: 新增union类型field
- fix: 去除navbar的scoped限制

## 0.5.10（2019.3.11）
- form新增支持配置layout、新增支持fieldSlotBlock
- 扩展operations的show支持string、object、function，同时field也支持配置show可以简单的实现表单联动

## 0.5.0（2019.2.26）
- 重构operations
- 新增reset operation
- operations支持所有field类型
- operation支持配置slot
- 列表支持多选

## 0.4.12（2019.2.21）
- element版本更新
- 增加全局参数拦截器
- bugfix

## 0.4.4（2019.1.25）
- api请求action重构
- field增加getter和setter

## 0.4.0（2019.1.15）
- 提供路由配置功能
- 错误页功能
- 框架优化、bug修复

## 0.3.4（2018.12.26）
- @ams-team/cli工具及定制模块打包
- 框架优化和bugfix

## 0.3.3（2018.12.21）
- 框架优化和bugfix
- resource增加foreignKeys用于资源关联
- 独立模块打包

## 0.3.0（2018.12.8）
- 默认api action优化
- 跨block的事件event和动作action调用
- 任意层级配置简化混入机制
- 支持任意层级数组array和对象object复合field类型的描述

## 0.2.1（2018.11.9）
- 修复和优化

## 0.2.0（2018.11.7）
- 完成基础框架
- 支持基础功能
- 支持常规field
- 支持常规block
- 具备常规场景的解决方案
- 完成集成流程
- 基本可用于实际项目
- 完成基本文档说明

## 0.1.0（2018.10.19）
- 完成基础demo
- 完成基础功能


## @ams-team/cli
### 0.3.3 (2019.2.21)
- 初始化定制环境 `ams init`
- 初始化新项目 `ams create`
- 定制模块 `ams field` 和 `ams block`
- 发布定制字段/区块 `ams publish`