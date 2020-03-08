# Markdown 编辑器

Markdown编辑器，依赖于[mavon-editor](https://github.com/hinesboy/mavonEditor)。如果纯展示状态下要开启xss攻击过滤，依赖于[xss]](https://github.com/leizongmin/js-xss)

## 使用

在AMS的resource配置使用：

```js
testMarkdown: {
    type: 'markdown',
    label: 'markdown'
}
```

自定义图片上传接口：

```js
testMarkdown: {
    type: 'markdown',
    label: 'markdown',
    props: {
        action: '//xxx.vip.com/api/upload', // 图片上传服务接口地址
        successCode: 1, // 非必传，默认取resource的successCode
        'success-url-key': 'url', // 非必传，默认值是url。上传结果优先取的是接口返回的data['success-url-key']，如没有则取data
    }
}
```


自定义图片上传回调：

```js
testMarkdown: {
    type: 'markdown',
    label: 'markdown',
    props: {
        imgAdd(pos, $file, $editor) {
            // 详情请查看mavonEditor文档 https://github.com/hinesboy/mavonEditor
            console.log(pos, $file, $editor);
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               $editor.$img2Url(pos, url);
           })
        }
    }
}
```

纯展示状态开启xss攻击过滤

```js
testMarkdown: {
    type: 'markdown',
    label: 'markdown',
    ctx: 'view',
    props: {
        xss: true, // 是否开启xss过滤，只在view状态下生效
    }
}
```
## props

|key|类型|备注|
|-|-|-|
|xss|boolean|是否开启xss过滤，只在`view`状态下生效|
|html|boolean|是否支持html输入，只在`edit`状态下生效|
|action|string|图片上传服务接口地址|
|successCode|number|非必传，默认取resource的successCode|
|success-url-key|string|非必传，默认值是url。上传结果优先取的是接口返回的`data['success-url-key']`，如没有则取`data`|

