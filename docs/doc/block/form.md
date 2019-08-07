---
Form: Form 表单
---
# Form 表单

## 在线配置
<ClientOnly>
<ams-config name="form" type="block"/>
</ClientOnly>

## 示例预览
<ClientOnly>
<block-form-demo />
</ClientOnly>

## 示例代码
<<< @/fe/.vuepress/components/block/form/block.js

## slotBlocks 配置

### 顶部slot block

配置子block的slot为`top`，可以插入在顶部

``` js {7}
blocks: {
    title1: {
        type: 'title',
        options: {
            title: '主标题'
        },
        slot: 'top'
    }
}
```

### 任意行后的slot block

配置子block的slot为`field:${fieldName}`，可以在某行后插入任意block，如想在 date 这个field后面插入title block，可以：


``` js {7}
blocks: {
    title1: {
        type: 'title',
        options: {
            title: '主标题'
        },
        slot: 'field:date'
    }
}
```