---
Cascader: Cascader 级联选择
---
# Cascader 级联选择

### 基础用法

<ClientOnly>
<field-cascader-demo blockName="cascaderField1"/>
</ClientOnly>

## 在线实验室
<ClientOnly>
<ams-config name="cascader" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'cascader'"></demo-list>
</ClientOnly>

## 示例代码
```js
cascader: {
    type: 'cascader',
    label: '级联选择',
    props: {
        
    }
}
```