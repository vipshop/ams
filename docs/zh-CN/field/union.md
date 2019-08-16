---
Union: Union 联合
---
# Union 联合

>联合field可以使用在同一个字段可以同时支持多种field的场景


## 在线实验室
<ClientOnly>
<ams-config name="union" type="field"/>
</ClientOnly>

## 示例预览

<ClientOnly>
<demo-list :type="'union'"></demo-list>
</ClientOnly>

## 示例代码
```js
select: {
    type: 'union',
    label: 'union',
    current: 'text',
    fields: {
        date: {
            type: 'timerange',
            label: 'timerange1'
        },
        text: {
            type: 'text',
            label: 'text1',
            default: 'sss'
        }
    }
}
```