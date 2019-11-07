---
Image: Image 图片
---
# Image 图片

> 注意：`image` 类型默认是不显示已上传列表（Element的 `upload` 组件默认是显示的）

### 基础用法

<ClientOnly>
<field-image-demo blockName="imageField1" onlineDemo="https://codepen.io/w3cmark/pen/mdbjzJO"/>
</ClientOnly>

### 大小、类型限制

可以通过 `field.check` 配置限制条件，支持 `maxSizeInKB`, `imgMaxWidth`, `imgMaxHeight`, `imgMinWidth`, `imgMinHeight`, `imgWidth`, `imgHeight`

<ClientOnly>
<field-image-demo blockName="imageField2" onlineDemo="https://codepen.io/w3cmark/pen/wvwxYar"/>
</ClientOnly>

### 圆角头像

可以通过 `props.headimage` 为 `true` 时配置。

<ClientOnly>
<field-image-demo blockName="imageFieldHeadimage" onlineDemo="https://codepen.io/w3cmark/pen/VwwQOJj"/>
</ClientOnly>

### 显示已上传列表

可以通过 `field.props['show-file-list']: true`、`field.props['file-list']` 和 `field.props['list-type']`配置，而`list-type` 可取值`text/picture/picture-card`，默认为 `text`

<ClientOnly>
<field-image-demo blockName="imageField3" onlineDemo="https://codepen.io/w3cmark/pen/MWgBPwP"/>
</ClientOnly>

### 带默认图列表

可以通过 `field.props['default-image-list']` 配置，适用从默认列表里选择一张或者上传的场景。

<ClientOnly>
<field-image-demo blockName="imageField4" onlineDemo="https://codepen.io/w3cmark/pen/LYPBgpE"/>
</ClientOnly>

### 大图预览

在 `ctx:view` 展示状态，点击图片可以预览本图的大图，如果通过 `field.props['preview-src-list']` 配置了预览列表，则预览该列表的所有大图。

<ClientOnly>
<field-image-demo blockName="imageField5" onlineDemo="https://codepen.io/w3cmark/pen/RwbBeWG"/>
</ClientOnly>

### 在线实验室
<ClientOnly>
<ams-config name="image" type="field"/>
</ClientOnly>

组件更多配置可参考Element：[Upload 上传](http://element-cn.eleme.io/#/zh-CN/component/upload)中的Attributes
