# field-radio-img

## 使用

在AMS的resourc配置使用：

```js
radioImg: {
    type: 'radio-img',
    label: '单选图片',
    props: {
        options: [
            {
                label: '全部人群',
                value: 'a',
                image: 'https://h5rsc.vipstatic.com/ams/favicon64*2.ico'
            },
            {
                label: '特殊人群',
                value: 'b',
                image: 'https://h5rsc.vipstatic.com/ams/favicon64*2.ico'
            }
        ]
    }
}
```

接口数据结构：

```
{
    "code": 0,
    "data": {
        "radioImg": 'a'
    },
    "msg": "success"
}
```