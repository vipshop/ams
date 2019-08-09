# 字段介绍

- 预览：包括 view（只读）和edit（编辑）
- 使用：具体ams的代码使用
- 传值：传给接口和从接口拿到的数据类型
- 配置：ams的配置介绍

field的默认配置表如下：

```js
export const defaultFieldProps = {
    cascader: {
        'change-on-select': true,
        filterable: true,
        'expand-trigger': 'hover'
    },
    color: {
        'show-alpha': true
    },
    date: {
        placeholder: '选择日期'
    },
    datetime: {
        placeholder: '选择日期时间'
    },
    datetimerange: {
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
    },
    rate: {
        'text-color': '#ff9900',
        'show-score': true
    },
    select: {
        multiple: true
    },
    switch: {
        'active-value': 1,
        'inactive-value': 0
    },
    password: {
        clearable: true,
        type: 'password'
    },
    text: {
        clearable: true
    },
    textarea: {
        clearable: true,
        type: 'textarea'
    },
    time: {
        placeholder: '选择时间'
    },
    transfer: {
        filterable: true,
        props: { key: 'value' }
    },
    image: {
        accept: 'image/png,image/gif,image/jpeg'
    },
    progress: {
        'text-inside': true,
        'stroke-width': 18
    }
};

export const defaultListFieldWidth = {
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

export const defaultFieldData = {
    text: ''
};
```