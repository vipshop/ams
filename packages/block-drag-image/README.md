# block-drag-image AMS拖拽图片框

## 预览图

![block-drag-image](http://h5rsc.vipstatic.com/ams/packages/block-drag-image.png)

## 例子

```js
ams.block('dragimage', {
    blocks: {
        dragImageTopBlock: {
            type: 'component',
            style: {
                margin: '15px 0 25px'
            },
            options: {
                is: 'div',
                text: ''
            },
            operations: {
                showForm: {
                    type: 'field',
                    label: '',
                    field: {
                        type: 'file',
                        props: {
                            accept: 'image/png,image/jpeg',
                            'button-label': '上传文件',
                            'auto-upload': false,
                            'show-file-list': false,
                            'on-change': (file) => {
                                ams.blocks.dragImagePicBlock.options.url = window.URL.createObjectURL(file.raw);
                            }
                        }
                    }
                }
            }
        },
        dragImagePicBlock: {
            type: 'drag-image',
            ctx: 'view',
            options: {
                url: 'http://c.vpimg1.com/upcb/2019/09/17/172/ias_156871245334665.jpg',
                width: 384, // 底图宽度
                height: 184, // 底图高度
                cutWidth: 200, // 需要裁剪的尺寸宽度
                imgWidth: '500px', // 图片展示宽度
                left: 100, // 需要裁剪的区域离左边距离
                ratio: 0.04, // 移动速度
                showFrame: true // 是否展示裁剪框
            },
            on: {
                getFrameLeft(arg) {
                    // 获取需要裁剪的区域离左边距离
                    console.log(arg);
                }
            }
        }
    }
});
```