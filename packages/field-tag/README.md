# field-tag AMS标签

## 预览图

![field-tag](http://h5rsc.vipstatic.com/ams/packages/field-tag.png)

## 使用

在AMS的resourc配置使用：

```js
// 输入创建标签
testTag: {
    type: 'tag',
    label: '标签',
    props: {
        'allow-create': true
    }
}

// 选择标签（接口数据）
testTag: {
    type: 'tag',
    label: '标签',
    props: {
        placeholder: '请输入标签',
        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
        successCode: 200
    }
}

// 选择标签（静态数据）
testTag: {
    type: 'tag',
    label: '标签',
    props: {
        placeholder: '请选择标签',
        options: [
            {
                'id': 2001,
                'name': '电商',
            },
            {
                'id': 2002,
                'name': '游戏',
            },
            {
                'id': 2003,
                'name': '效率',
            },
            {
                'id': 2004,
                'name': '资讯',
            },
            {
                'id': 2005,
                'name': '社区',
            }
        ]
    }
}

// 创建或选择标签（静态数据，也支持接口数据）
testTag: {
    type: 'tag',
    label: '标签',
    props: {
        'allow-create': true,
        options: ['唯品会', '天猫', '淘宝', '京东', '拼多多']
    }
}
```

接口数据结构：

```js
// 输入创建标签
{
    "code": 200,
    "data": {
        "list":["aaaa.bbb.name", "aaaa.ccc.name"]
    },
    "msg": "success"
}

// 从接口选择已有标签添加模式
{
    "code": 200,
    "data": {
        "list":[
            {
                "id": 2001,
                "name": "aaaa.bbb.name",
                "subName": "分类一" //【可选】显示在下拉选择的次标题，如果没有subName，下拉次标题显示id
            }
            ...
        ]
    },
    "msg": "success"
}
```

> 其中上面每个标签包含`id`、`name`和`subName`三个字段，建议接口统一输出同名的字段。如果有旧接口无法兼容，可以通过`props.idKey`、`props.nameKey`和`props.subNameKey`来配置和接口对应的字段名。

## 传值
Array

```js
// 自由输入添加标签模式
["aaaa.bbb.name", "aaaa.ccc.name"]

// 选择标签
[
    {
        "id":2001,
        "name":"aaaa.bbb.name",
        "subName": "分类一" // //【可选】显示在下拉选择的次标题，如果没有subName，下拉次标题显示id
    },
    ...
]
```

## 深入：get、set与view配置

如果业务的数据结构千奇百怪，上面配置无法实现，可以通过更自由的`get`、`set` 与 `view` 来配置

```js
testTag: {
    type: 'tag',
    label: '选择标签',
    props: {
        placeholder: '请输入标签',
        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
        successCode: 200
    },
    get(value) { // 编辑状态下有效（ctx 为 edit）
        console.log(value)
        return value.map(item => {
            return (item.name || item) + '-get';
        });
    },
    set(value) { // 编辑状态下有效（ctx 为 edit）
        console.log(value)
        return value.map(item => {
            return (item.name || item) + '-set';
        });
    },
    view(value) { // 显示状态下有效（ctx 为 view）
        console.log(value)
        return value.map(item => {
            return item.name + '-view';
        });
    }
},
```

## 配置

|  参数  |  类型  |  必填  |  说明  |  默认值 |
| ---- | ---- | ---- | ---- | ---- |
| type | string | 是 | 文本类型 | 固定值为`tag` |
| label | string | 否 | 标签文本 | - |
| hidden | boolean | 否 | 是否隐藏field | `false`|
| rules | array | 否 | 校验规则，详见[async-validator](https://github.com/yiminghe/async-validator) | - |
| collapseLimit | number | 否 | 展示状态下，最多显示的标签个数，超出隐藏 | - |
| on | object | - | 事件绑定 | - |
| on.click | function | 否 | 点击 Tag 时触发的事件 | - |
| on.close | function | 否 | 关闭 Tag 时触发的事件 | - |
| props | object | - | 补充属性 | - |
| props.action | string | 否 | 标签数据接口地址（优先级高于`options`） | - |
| props.options | array | 否 | 标签静态数据接口地址 | - |
| props.method | string | 否 | 接口请求方法， | `GET` |
| props.successCode | number | 否 | 接口请求成功code | 和resource的全局配置里的`api` `successCode` 一致 |
| props.withCredentials | boolean | 否 | 接口请求是否携带cookie | 和resource的全局配置里的`api` `withCredentials` 一致 |
| props.placeholder | string | 否 | 输入框的`placeholder`配置 | `请输入...` |
| props.button | string 或者 boolean | 否 | 如果是`string`类型，代表添加按钮的文案配置；如果是`boolean`类型，值为false代表隐藏该按钮 | `+ 添加` |
| props.size | string | 否 | 尺寸，可取值：medium / small / mini | -  |
| props.closable | boolean | 否 | 编辑状态下，标签是否可关闭 | `false` |
| props.template | string | 否 | 标签显示的内容模板，语法和vue的模板语法类似，比如 `{{ name }} - {{ subName }} - {{ id }}` （其中`name`、`subName`和`id`是数据结构里的字段）| 默认只展示`name`字段 |
| props['multiple-limit'] | number | 否 | 用户最多可以选择的项目数，为 0 则不限制 | 0 |
| props['allow-create'] | boolean | 否 | 输入文字来创建新的标签（注意：允许输入创建，数据结构统一使用元素为字符串的数组格式 `["aaaa.bbb.name", "aaaa.ccc.name"]`） | `false` |
| props.idKey | string | 否 | 表示`id`这个字段key | `id` |
| props.nameKey | string | 否 | 表示`name`这个字段key | `name` |
| props.subNameKey | string | 否 | 表示`subName`这个字段key | `subName` |

更多的props配置请查看：

+ [element-input](http://element-cn.eleme.io/#/zh-CN/component/input)
+ [element-tag](http://element-cn.eleme.io/#/zh-CN/component/tag)
