---
Image: Image 图片
---
# Image 图片

### 基础用法

<ClientOnly>
<field-image-demo blockName="imageField1"/>
</ClientOnly>

### 大小、类型限制

可以通过 `field.check` 配置限制条件，支持 `maxSizeInKB`, `imgMaxWidth`, `imgMaxHeight`, `imgMinWidth`, `imgMinHeight`, `imgWidth`, `imgHeight`

<ClientOnly>
<field-image-demo blockName="imageField2"/>
</ClientOnly>

### 带已上传列表

可以通过 `field.props['file-list']` 和 `field.props['list-type']`配置，而`list-type` 可取值`text/picture/picture-card`，默认为 `text`

<ClientOnly>
<field-image-demo blockName="imageField3"/>
</ClientOnly>

### 带默认图列表

可以通过 `field.props['default-image-list']` 配置，适用从默认列表里选择一张或者上传的场景。

<ClientOnly>
<field-image-demo blockName="imageField4"/>
</ClientOnly>

### 在线实验室
<ClientOnly>
<ams-config name="image" type="field"/>
</ClientOnly>

组件更多配置可参考Element：[Upload 上传](http://element-cn.eleme.io/#/zh-CN/component/upload)中的Attributes
