---
Cascader: Cascader 级联选择
---
# Cascader 级联选择

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
        options: [
            {
                value: 'zhinan',
                label: '指南',
                children: [
                    {
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [
                            {
                                value: 'yizhi',
                                label: '一致'
                            },
                            {
                                value: 'fankui',
                                label: '反馈'
                            },
                            {
                                value: 'xiaolv',
                                label: '效率'
                            },
                            {
                                value: 'kekong',
                                label: '可控'
                            }
                        ]
                    },
                    {
                        value: 'daohang',
                        label: '导航',
                        children: [
                            {
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            },
                            {
                                value: 'dingbudaohang',
                                label: '顶部导航'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```