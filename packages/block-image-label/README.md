# block-image-label AMS图片打标签

## 预览图

![block-image-label](http://h5rsc.vipstatic.com/ams/packages/block-image-label.png)

## 例子

```js
ams.block('imageLabel', {
    ctx: 'edit',
    type: 'image-label',
    options: {
        title: '标题文本标题'
    },
    data: {
        imgList: [
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        ],
        imgTipComList: [
            {
                top: 20,
                left: 20,
                width: 50,
                height: 50,
                text: '你好'
            }
        ]
    },
    operations: {
        button: {
            type: 'button',
            label: 'xx'
        }
    }
})
```