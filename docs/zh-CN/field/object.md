---
Object: Object 对象
---
# Object 对象

## 在线实验室
<ClientOnly>
<ams-config name="object" type="field"/>
</ClientOnly>

## 示例预览

<ClientOnly>
<demo-list :type="'object'"></demo-list>
</ClientOnly>

## 示例代码
```js
simpleObject: {
    type: 'object',
    label: 'simpleObject',
    fields: {
        text: {
            type: 'text',
            label: 'rule2',
            rules: [
                {
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, 
                { 
                    min: 3, 
                    max: 5, 
                    message: '长度在 3 到 5 个字符', 
                    trigger: 'blur' 
                }
            ]
        },
        date: {
            type: 'date',
            label: 'date'
        }
    }
},
mutiObject: {
    type: 'object',
    label: 'mutiObject',
    fields: {
        date: {
            type: 'date',
            label: 'date'
        },
        checkbox: {
            type: 'checkbox',
            label: 'checkbox',
            props: {
                options: {
                    '1': '黄金屋'
                }
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
        },
        ArrayObject: {
            type: 'array',
            label: 'ArrayObject',
            field: {
                type: 'object',
                label: 'object',
                fields: {
                    text: {
                        type: 'text',
                        label: 'text',
                        rules: [
                            {
                                required: true,
                                message: '请输入活动名称',
                                trigger: 'blur'
                            }, 
                            { 
                                min: 3, 
                                max: 5, 
                                message: '长度在 3 到 5 个字符', 
                                trigger: 'blur' 
                            }
                        ]
                    },
                    date: {
                        type: 'date',
                        label: 'date'
                    }
                }
            }
        }
    }
}
```