---
Array: Array 数组
---
# Array 数组

## 在线实验室
<ClientOnly>
<ams-config name="array" type="field"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<demo-list :type="'array'"></demo-list>
</ClientOnly>

## 示例代码
```js
simpleArray: {
    type: 'array',
    label: 'simpleArray',
    field: {
        type: 'text',
        label: 'text'
    }
},
ArrayArray: {
    type: 'array',
    label: 'ArrayArray',
    field: {
        type: 'array',
        label: 'array',
        field: {
            type: 'text',
            label: 'text'
        }
    }
}
```