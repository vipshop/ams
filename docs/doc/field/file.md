---
File: File 文件 
---
# File 文件

## 如何选择 file 和 originfile 类型

- `file` 适合文件上传是单独的接口，独立于表单
- `originfile` 用于表单内文件上传需要通过二进制的方式根据表单一起提交上传，originfile 需要设置 `contentType` 为 `multipart` 才能正常上传

## 在线配置
<ClientOnly>
<ams-config name="file" type="field"/>
</ClientOnly>

## 示例预览

<ClientOnly>
<demo-list :type="'file'"></demo-list>
</ClientOnly>

## 示例代码
```js
file: {
    type: 'file',
    label: '文件上传',
    tip: '只能上传jpg/png文件，且不超过500kb',
    successUrlKey: 'url',
    props: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
    }
}
```

组件更多配置可参考Element：[Upload 上传](http://element-cn.eleme.io/#/zh-CN/component/upload)中的Attributes