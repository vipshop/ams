---
Tag: Tag 标签
---
# Tag 标签

## 预览

<ClientOnly>
<demo-list :type="'tag'"></demo-list>
</ClientOnly>

## 安装使用

### npm安装 @ams-team/field-tag <Badge text="1.0.9"/>

```
npm i --save @ams-team/field-tag
```

npm安装完后，记得在入口文件引入：
```js
import tag from '@ams-team/field-tag';

Vue.use(tag);
```

### 使用

在AMS的resourc配置：

```js
testTag: {
    type: 'tag',
    label: '标签',
    props: {
        placeholder: '请输入标签',
        action: 'https://www.easy-mock.com/mock/5a0023effbbb09615044cb82/tag',
        successCode: 200
    }
}
```

接口数据结构：

```
{
    "code":200,
    "data":{
        "list":[
            {
                "id":"aaaa.bbb",
                "name":"aaaa.bbb.name"
            }
            ...
        ]
    },
    "msg":"success"
}
```

## 传值
Array

```
[
    {
        "id":"aaaa.bbb",
        "name":"aaaa.bbb.name"
    }
    ...
]
```

## 配置

| 参数 | 类型 | 必填 | 说明
| -- | -- | -- | --
| type | string | 是 | 文本类型，固定值为`tag`
| label | string | 否 | 标签文本
| hidden | boolean | 否 | 是否隐藏field，默认为false
| rules | array | 否 | 校验规则，详见[async-validator](https://github.com/yiminghe/async-validator)
| props | object | - | 补充属性
| props.action | string | 是 | 标签数据接口地址
| props.method | string | 否 | 接口请求方法，默认值为`GET`
| props.successCode | number | 否 | 接口请求成功code，默认值和resource的全局配置里的`api` `successCode` 一致
| props.placeholder | string | 否 | 输入框的`placeholder`配置
| props.button | string | 否 | 添加按钮的文案配置，默认值为 `+ 添加`
| props.size | string | 否 | 尺寸，可取值：medium / small / mini
| props.closable | boolean | 否 | 编辑状态下，标签是否可关闭，默认值为 `false`
| props.template | string | 否 | 标签显示的内容模板，语法和vue的模板语法类似，比如 `{{ name }} - {{ id }}` （其中name和id是数据结构里的字段），默认标签内容只展示`name`字段
