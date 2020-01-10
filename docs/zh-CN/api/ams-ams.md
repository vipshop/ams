# ams


## ams.$prevReturn

- 类型： any
- 用法：

action调用显式的返回值，会自动更新 `$prevReturn`，用于action参数传递，可以通过 `ams.$prevReturn = undefined` 或者 `@clearReturn` action来清空 `$prevReturn`

## ams.actions

- 类型： object（只读）
- 用法：

全局的action引用，可以访问到通过 `ams.action()` 注册的action

## ams.blocks

- 类型： object（只读）
- 用法：

全局的block引用，可以访问到通过 `ams.block()` 注册的block

## ams.$blocks

- 类型： object（只读）
- 用法：

全局的block vue对象引用，可以访问到已渲染的通过 `ams.block()` 注册的block vue对象

## ams.resources

- 类型： object（只读）
- 用法：

全局的resource引用，可以访问到通过 `ams.resource()` 注册的resource


## ams.action(name, action)

- 参数：
    - name: `string`
    - action: `function`
- 用法：

注册一个全局action，详见 [event 与 action](./action.md)


## ams.resource(name, resource)

- 参数：
    - name: `string`
    - resource: `object`
- 用法：

注册一个资源，参考 [resource](./resource.md)

## ams.block(name, block)

- 参数：
    - name: `string`
    - block: `object`
- 用法：

注册一个区块，参考 [block](./block.md)

## ams.render(name, el)

- 参数：
    - name: `string`
    - block: `string` | `HTMLElement`
- 用法：

将区块渲染到el上面，

::: tip
注册block时可以传入 `render: el`，和注册block后再调用 `ams.render` 一样
:::

## ams.$on( event, callback )

- 参数：
  - `{string | Array<string>} event`
  - `{Function} callback`

- 用法：

  监听当前实例上的自定义事件。事件可以由`ams.$emit`触发。回调函数会接收所有传入事件触发函数的额外参数。

- 示例：

  ``` js
  ams.$on('test', function (msg) {
    console.log(msg)
  })
  ams.$emit('test', 'hi')
  // => "hi"
  ```

## ams.$once( event, callback )

- 参数：
  - `{string} event`
  - `{Function} callback`

- 用法：

  监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

## ams.$off( [event, callback] )

- 参数：
  - `{string | Array<string>} event`
  - `{Function} [callback]`

- 用法：

  移除自定义事件监听器。

  - 如果没有提供参数，则移除所有的事件监听器；

  - 如果只提供了事件，则移除该事件所有的监听器；

  - 如果同时提供了事件与回调，则只移除这个回调的监听器。

## ams.$emit( eventName, [...args] )

- 参数：
  - `{string} eventName`
  - `[...args]`

  触发当前实例上的事件。附加参数都会传给监听器回调。

## ams.param(data)

- 参数：
    - data: `object`
- 用法：

返回将post数据 data序列化为`x-www-form-urlencoded`格式

## ams.createApiAction(params)
- 参数：
    - params： `object`
        - getOptions： `async Function` 请求参数获取回调
        - beforeRequest： `async Function` 请求前处理参数回调
        - success： `async Function` 成功回调
- 返回：
    - async Function


## ams.request(opt)
- 参数：
    - opt： `object`
        - opt.method：'get' | 'post'
        - url：string
        - data：object
        - params：object
        - headers：object
        - withCredentials：boolean,
        - contentType 'json' | 'form'
- 返回：
    - Promise

- 用法：

参数类似 [axios](https://github.com/axios/axios)

## ams.configs

- 类型： object（只读）
- 用法：

获取config配置，可以通过ams.config(obj)更改

## ams.config(cfg)

- 参数：
    - cfg: `object` 会深度合并 ams.configs
- 用法：

深度合并 ams.configs里面的配置

## ams.deepCloneConfig(cfg)

- 参数：
    - cfg: `object`
- 用法：

可以通过`base`简化配置，`ams.block` 和 `ams.resource` 先都会经过 `ams.deepCloneConfig` 处理

详见 [配置简化（默认配置）](./config.md)

## ams.callAction(acitonName = '', args = {})

- 参数：
    - acitonName: `string`
    - args: `object`
- 用法：

调用 `action`或`event`，如全局action: `ams.callAction('routerPush:/login')` ，调用某个block的action：`ams.callAction('formEdit.init')`；默认action`list`、`read`、`update`、`delect`、`create`可通过promise、async/await捕获到接口数据、也可以在下一个action通过$prevReturn拿到

```javascript
// 例子：请求列表接口listaction，并且传page和type两个参数（如果是接口的get参数，记得不要少了外层的params）
ams.callAction('list', {
    params: {
        page: 10,
        type: 'Andriod'
    }
})

// action的promise
ams.callAction('@list').then(res => {
    // res
})

// action的async/await
async getData() {
    const res = await this.callAction('@read')
}

// 链式调用
{
    events: '@list @afterHandle',
    actions: {
        afterHandle({ $prevReturn }) {
            console.log('---', $prevReturn)
        }
    }
}

```