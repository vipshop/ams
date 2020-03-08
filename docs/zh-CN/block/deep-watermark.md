# 添加水印

在每个block的options中配置watermark可以添加水印，目前提供的方式如下：

### 方式一：将watermark设置为true
<ClientOnly>
<block-deep-watermark-demo blockName="defaultList" onlineDemo="https://codepen.io/wuzebin/pen/OJPvePa"/>
</ClientOnly>

### 方式二：设置watermark的参数

<ClientOnly>
<block-deep-watermark-demo blockName="customList" onlineDemo="https://codepen.io/wuzebin/pen/GRgxboX"/>
</ClientOnly>

配置参数如下

```js
options: {
    watermark: {
        container: this.$el, // 默认值为this.$el
        width: '200px', // 默认值300px
        height: '150px', // 默认值 200px
        textAlign: 'center', // 默认值center
        textBaseLine: 'middle', // 默认值middle
        font: '18px Microsoft Yahei', // 设置字体，默认为：18px Microsoft Yahei
        fillStyle: 'rgba(236, 234, 234, 1)', // 设置颜色，默认为：rgba(236, 234, 234, 0.8)
        content: 'zebin.wu', // 设置水印内容，默认为“请勿外传”
        rotate: '30', // 设置旋转角度，默认30
        zIndex: 1000 // 设置z-index层级，默认为1000
    }
}
```
