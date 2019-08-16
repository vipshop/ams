---
title: Checkbox 多选框
---
# Checkbox 多选框

## 在线实验室
<ClientOnly>
<ams-config name="checkbox" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'checkbox'"></demo-list>
</ClientOnly>

## 示例代码
```js
checkbox: {
    type: 'checkbox',
    label: '多选',
    props: {
        options: {
            a: '黄金糕',
            b: '双皮奶',
            c: '蚵仔煎',
            d: '龙须面',
            e: '北京烤鸭'
        }
    }
}
```

组件更多配置可参考Element：[Checkbox 多选框](http://element-cn.eleme.io/#/zh-CN/component/checkbox)中的Input Attributes
