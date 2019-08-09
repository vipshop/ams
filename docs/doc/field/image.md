---
Image: Image 图片
---
# Image 图片

## 在线配置
<ClientOnly>
<ams-config name="image" type="field"/>
</ClientOnly>

## 示例预览

<ClientOnly>
<demo-list :type="'image'"></demo-list>
</ClientOnly>

## 示例代码
```js
testImage: {
    type: 'image',
    label: '图片上传',
    tip: '只能上传jpg/png文件，且不超过500kb',
    successUrlKey: 'url',
    props: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
    }
},
```

组件更多配置可参考Element：[Upload 上传](http://element-cn.eleme.io/#/zh-CN/component/upload)中的Attributes
