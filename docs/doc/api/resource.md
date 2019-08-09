# 资源（resource）

资源（resource）主要是用于描述接口的字段（field）组成以及请求配置参数，同一个资源可以被多个 `block` 共享使用

## 注册资源

```js
ams.resource(name: String, config: Object)
```

引入ams后直接定义该resource的name和config，就可以注册一个resource

> 不可以注册name完全一致的resource

举个例子：

```js
ams.resource('demo-resource', {
    key: 'id',
    api: {
        prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/',
        create: 'create',
        update: 'update',
        read: 'read',
        delete: 'delete',
        list: 'list'
    },
    fields: {
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

以上声明了名字为 `demo-resource` 的资源，而这个资源由三部分组成，分别时`key` `api` `fields`，其中这三部分的意义为：
- `key`： 标识该resource的keyName，有些场景需要通过 `queryString` 传入，通过解析 `key=value` 获取
- `api`： 对resource的一些内置方法，`prefix`为接口地址，目前提供了`create` `update` `read` `delete` `list` 几个内置请求方法
- `fields`： resource里的详细的字段描述，详情可以查看 字段 的介绍

### fields

数据接口详细的字段描述，点击前往[更深入的了解fields](/api/field.html)

#### 通用配置

| 参数 | 类型 | 是否必传 | 说明
| -- | -- | -- | --
| type | string | 是 | field的类型
| label | string | 否 | 标签文本
| hidden | boolean | 否 | 是否隐藏field，默认为false
| show | string、object、function | 否 | 联动显示条件，string为目标field名、如'a.b'，object为{name:'a.b', value:'2'}，function返回false则隐藏
| info | string | 否 | 提示信息tooltip，会显示的form的label旁
| props | object | 否 | 补充属性，用于添加DOM属性或者透传至element组件，如disabled
| rules | array | 否 | 校验规则，详见[async-validator](https://github.com/yiminghe/async-validator)
| default | any | 否 | 默认值
| get | function | 否 | get函数
| set | function | 否 | set函数
| view | function | 否 | view函数
| labelWidth | string | 否 | form内label的显示宽度

## 使用资源

根据资源名字来使用某个资源，在注册`block`时指定资源名字来使用

```javascript
ams.block('demo', {
  resource: 'demo-resource',
  ...
});
```


