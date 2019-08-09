# ams.utils

## ams.utils.get(object, path)

- 参数：
    - object: `object`
    - path: `string`
- 用法：

通过 `path` 读取 `object` 的值

- 示例

```js
ams.utils.get({
    a: [1, {b: 2}]
}, 'a[1].b')
```

## ams.utils.set(object, path)

- 参数：
    - object: `object`
    - path: `string`
    - value: `any`
- 用法：

通过 `path` 设置 `object` 的值

- 示例
set
```js
ams.utils.set({
    a: [1, {b: 2}]
}, 'a[1].b', 3)
```


## ams.utils.parseTime(time, cFormat)

- 参数：
    - time: `Date` | `string` | `number`
    - cFormat: `string` 默认： '{y}-{m}-{d} {h}:{i}:{s}'
- 用法：

格式化时间

支持：`y|m|d|h|i|s|a`，a 为 `['日', '一', '二', '三', '四', '五', '六']`


## ams.utils.parseString(str, decode)

- 参数：
    - str: `string`
    - decode: `boolean` 默认：true
- 用法：

将querystring解析为object形式，如 `a=1&b=2` 转换成 `{a:1,b:2}`


## ams.utils.getQueryString(name, url)

- 参数：
    - name: `string`
    - url: `string` 默认：location.href
- 用法：

获取querystring对应key的值

## ams.utils.listStringHasValue(list, value)

- 参数：
    - list: `string`
    - value: `string`
- 用法：

查找逗号分隔的对象里是否有对应value，如 `ams.utils.listStringHasValue('a,b,c', 'b') === true`

## ams.utils.getType(obj)

- 参数：
    - obj: `any`
- 用法：

获取obj的真实类型，如 `ams.utils.getType([1]) === 'array'`

## ams.utils.deepExtend(destination, source)

- 参数：
    - destination: `object`
    - source: `object`
- 用法：

对象深度合并

## ams.utils.isExternal(path)

- 参数：
    - path: `string`
- 用法：

判断path是否是外链（http、mailto等）

## ams.utils.getByOrder(...args)

- 参数：
    - ...args any
- 用法：

按照传入的多个参数的顺序计算，遇到非 `undefined` 值返回，
如 `ams.utils.getByOrder(undefined , 1, 0) === 1`