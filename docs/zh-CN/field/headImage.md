---
HeadImage: HeadImage 头图
---
# HeadImage 头图

## 在线实验室
<ClientOnly>
<ams-config name="headimage" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'headimage'"></demo-list>
</ClientOnly>

## 示例配置
```js
headImage: {
    type: 'headimage',
    label: '头像',
    tip: '只能上传jpg/png文件，且不超过500kb',
    successUrlKey: 'url',
    props: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
    }
}
```

组件更多配置可参考Element：[Upload 上传](http://element-cn.eleme.io/#/zh-CN/component/upload)中的Attributes
