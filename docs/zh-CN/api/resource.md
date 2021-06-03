# 资源（resource）

资源（resource）主要是用于描述接口的字段（field）组成以及请求配置参数，同一个资源可以被多个 `block` 共享使用

<ClientOnly>
<scrimba href="https://scrimba.com/c/cV8vRKuR" title="字段和区块" />
</ClientOnly>

## 注册资源

```js
ams.resource(name: String, config: Object)
```
通过`ams.resource`这个方法可以注册资源，`name`是某个资源的唯一标识，已经注册的资源可以通过这个`name`在任何区块里被引用，不可重复注册同一个资源。

举个例子：

```js
ams.resource('demo-resource', {
    key: 'id',
    foreignKeys: ['testArrays'],
    api: { // 数据接口相关
        prefix: '//rap2api.taobao.org/app/mock/231578/ams/mock/',
        create: 'create',
        update: 'update',
        read: 'read',
        delete: 'delete',
        successCode: 1, // 作用于resource所有默认action
        // list: 'list', 方法1
        list: { // 方法2：可以给每个内置action单独配置path,method,successCode等
            path: 'list',
            method: 'post',
            successCode: 1, // 只作用于当前action
            // 所有内置action都有的方法
            requestDataParse(data) {
                return data
            },
            // 仅list和read有transform方法，用于在AMS赋值给区块前，转化接口返回数据，如果是list组件，这里的data代表的是data
            responseDataParse({ code, data, msg }) {
                return data
            }
        }
    },
    fields: { // 字段
        id: {
            type: 'text',
            label: 'id'
        },
        testArrays: {
            type: 'array',
            label: 'testTexts',
            field: {
                type: 'text',
                label: 'testTexts',
                props: {
                    'suffix-icon': 'el-icon-service'
                }
            }
        }
    }
})
```

以上注册了名字为 `demo-resource` 的资源，而这个资源由三部分组成，分别时`key` `api` `fields`，其中这三部分的意义为：

- `key`： 【非必须】标识该resource的`keyName`，有些场景需要通过 `queryString` 传入，通过解析 `key=value` 获取

- `foreignKeys`： 发起resource里的api接口时，可以附带传的参数，接收数组的字段格式，同`key`一样会通过`queryString` 传入

- `api`： 对resource的一些内置方法，`prefix`为接口地址，目前提供了`create` `update` `read` `delete` `list` 几个内置请求方法

- `fields`： resource里的详细的字段描述，点击前往[更深入的了解fields](/field/)

## field通用配置

| 参数 | 类型 | 是否必传 | 说明
| -- | -- | -- | --
| type | string | 是 | field的类型，比如`text`、`textarea`、`rate`...
| ctx | string | 否 | field的状态，可取值：`eidt`、`view`。默认是当前field所在的`block`的`ctx`配置决定
| label | string | 否 | 标签文本
| hidden | boolean | 否 | 是否隐藏field，默认为false
| show | string、object、function | 否 | 联动显示条件，string为目标field名、如'a.b'，object为{name:'a.b', value:'2'}，function返回false则隐藏
| info | string | 否 | 提示信息tooltip，会显示的form的label旁
| props | object | 否 | 补充属性，用于添加DOM属性或者透传至element组件，如disabled
| on | object | 否 | 事件绑定，将会把事件透传至element组件，如click
| rules | array | 否 | 校验规则，详见[async-validator](https://github.com/yiminghe/async-validator)
| default | any | 否 | 默认值
| get | function | 否 | get函数，编辑状态下生效（`ctx: 'eidt'`）
| set | function | 否 | set函数，编辑状态下生效（`ctx: 'eidt'`）
| view | function | 否 | view函数，显示状态下生效（`ctx: 'view'`）
| labelWidth | string | 否 | form内label的显示宽度

## 使用资源

根据资源名字来使用某个资源，在注册`block`时指定资源名字来使用

```javascript
ams.block('demo', {
  resource: 'demo-resource',
  ...
});
```

接下来，我们将介绍AMS另外一个核心概念`区块`

[下一节：区块](/api/block.html)
