---
title: Text 文本
---
# Text 文本

> 用于单行文本类型输入和展示

## 在线实验室
<ClientOnly>
<ams-config name="text" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'text'"></demo-list>
</ClientOnly>

## 示例代码
```js
test: {
    type: 'text',
    label: '文本',
    rules: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
        }
    ],
    props: {
        'suffix-icon': 'el-icon-service',
        'disabled': true
    }
}
```

组件更多配置可参考Element：[Input 输入框](http://element-cn.eleme.io/#/zh-CN/component/input)中的Input Attributes
