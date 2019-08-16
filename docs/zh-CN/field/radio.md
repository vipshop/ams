---
Radio: Radio 单选框
---
# Radio 单选框

## 在线实验室
<ClientOnly>
<ams-config name="radio" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'radio'"></demo-list>
</ClientOnly>

## 示例代码
```js
radio: {
    type: 'radio',
    label: '单选',
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

组件更多配置可参考Element：[Radio 单选框](http://element-cn.eleme.io/#/zh-CN/component/radio)中的Input Attributes