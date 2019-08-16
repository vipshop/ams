# 字段介绍

- 预览：包括 view（只读）和edit（编辑）
- 使用：具体ams的代码使用
- 传值：传给接口和从接口拿到的数据类型
- 配置：ams的配置介绍

各个`field`的`props`默认配置如下：

```js
export const defaultFieldProps = {
    cascader: { // 级联选择
        props: {
            'change-on-select': true, // 是否允许选择任意一级的选项（element 2.9.2已经去掉该配置项）
            filterable: true, // 是否可搜索选项
            'expand-trigger': 'hover' // 次级菜单的展开方式默认是 hover
        }
    },
    color: {、
        props: {
            'show-alpha': true // 是否支持透明度选择
        }
    },
    date: {
        props: {
            placeholder: '选择日期' // 默认的提示语
        }
    },
    datetime: {
        props: {
            placeholder: '选择日期时间' // 默认的提示语
        }
    },
    datetimerange: {
        props: {
            'range-separator': '至', // 选择范围时的分隔符
            'start-placeholder': '开始日期', // 开始日期默认的提示语
            'end-placeholder': '结束日期' // 结束日期默认的提示语
        }
    },
    rate: {
        props: {
            'text-color': '#ff9900', // 辅助文字的颜色
            'show-score': true // 是否显示当前分数，show-score 和 show-text 不能同时为真
        }
    },
    select: {
        props: {
            multiple: true // 是否多选
        }
    },
    switch: {
        props: {
            'active-value': 1, // switch 打开时的值
            'inactive-value': 0 // switch 关闭时的值
        }
    },
    password: {
        props: {
            clearable: true, // 默认右边有清除按钮
            type: 'password' // 默认input类型为password
        }
    },
    text: {
        props: {
            clearable: true // 默认右边有清除按钮
        }
    },
    textarea: {
        props: {
            clearable: true, // 默认右边有清除按钮
            type: 'textarea' // 默认input类型为password
        }
    },
    time: {
        props: {
            placeholder: '选择时间' // 默认的提示语
        }
    },
    transfer: {
        props: {
            filterable: true, // 是否可搜索
            props: { // 数据源的字段别名（没看错，这个props是element定义的）
                key: 'value' 
            }
        }
    },
    image: {
        props: {
            accept: 'image/png,image/gif,image/jpeg' // 支持类型
        }
    },
    progress: {
        props: {
            'text-inside': true, // 进度条显示文字内置在进度条内（只在 type=line 时可用）
            'stroke-width': 18 // 进度条的宽度，单位 px
        }
    }
};

export const defaultListFieldWidth = { // 各个field默认宽度
    rate: '170px',
    datetimerange: '340px',
    cascader: '250px',
    image: '120px',
    headimage: '130px',
    file: '160px',
    progress: '150px',
    video: '200px',
    audio: '160px'
};

export const defaultFieldData = { // 各个field默认值
    text: ''
};
```