# event 与 action

## events

- 类型：`object且{ [field: string]: string }`
- 默认值：`undefined`

表单的事件定义
```js
events: {
    init: '@read',
    submit: '@validate @confirm:确认提交吗? @update',
    cancel: '@cancel',
    dialog: '@demo-dialog.show'
}
```

定义block的事件流，采用链式action调用，前一个action执行完之后再调用下一个action，多个action之间用空格隔开

::: tip
如果希望多个异步action顺序依此执行，需要将action函数返回一个Promise或者使用async函数
:::

如`submit: '@validate @confirm:确认提交吗? @update'`表示为：

执行`validate` -> 执行`confirm`，传参`确认提交吗` -> 执行`update`

- action的传参有以下几种：

    - 通过`@action:args`传参，如`@confirm:确认提交吗?`，调用`confirm`事件，传参`确认提交吗`

    - 通过`@block.action:args1,args2`传参，如`@demo-dialog.show`，调用`demo-dialog`block中的`show`事件

## actions

- 类型：`{ function({ name: string, value: any }): void }`
- 默认值：`undefined`

```js
actions: {
    fieldChange({ name, value }) {
        if (name === 'testSwitch') {
            this.block.fields.testPassword.props.disabled = !value
        }
    },
    cancel() {
        this.$router.back()
    },
    getAlert() {
        // alert,自定义数据通过options配置
        this.emitEvent('alert', {
            message: '这是一个alert的弹框',
            options: {
                title: '我是一个alert的标题'
            }
        });
    },
    getPrompt() {
        // promt直接使用方式， 参考https://element.eleme.cn/#/zh-CN/component/message-box
        this.$prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的邮箱是: ' + value
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '取消输入'
            });
        });
    }
}
```

内置的action有如下
| 参数名 | 返回值 | 说明
| -- | -- | --
| read | Promise | 获取详情接口
| create | Promise | 获取创建接口
| update | Promise | 获取更新接口
| list | Promise | 获取列表接口, 可以通过$arg修改当前页码，如列表搜索使用 @list:1 将页码重置为1
| delete | Promise | 获取删除接口
| validate | Promise | 校验表单，valid时返回`resolve()`，unvalid时返回`reject(new Error('validate fail:', result))`;
| confirm | Promise | 调用确认框，用法为`@confirm:确认删除吗？`
| alert | Promise | 调用alert提示框，用法为`@alert:这是一个alert信息`, 自定义用法`this.emitEvent('alert', {})`，0.8.6+支持
| show | Promise | 设置`this.data.visible`为`true`，当`this.$nextTick()`执行然后返回
| hide | 无 | 设置`this.data.visible`为`false`
| clearReturn | 无 | 清除上一次action的返回值
| routerPush | Promise | 跳转新页面
| routerReplace | Promise | 重定向当前页
| routerGo | Promise | 回退或者前进 页面
| resetData | Promise | (ams >= 0.5.0) 重置block数据（如表单重置）
| wait | Promise | (ams >= 0.7.5) 等待0ms后继续（等待ui更新队列完成）可以通过$arg传入需要等待的ms数，默认为0
| addItemAfter | Promise | (ams >= 0.7.7) 在列表后面显示增加一项数据的表单，可通过参数指定resource和blockConfig
| addItemDialog | Promise | (ams >= 0.7.7) 弹窗增加一项数据，可通过参数指定resource和blockConfig
| editItemAfter | Promise | (ams >= 0.7.7) 在列表后面显示修改改项数据的表单，可通过参数指定resource和blockConfig
| editItemDialog | Promise | (ams >= 0.7.7)  弹窗修改该项数据，可通过参数指定resource和blockConfig

可以自定义actions，可被`events`中使用，如果定义跟内置action同名则会覆盖默认提供方法

field的数据变更触发可以通过在actions中定义`fieldChange`获取对应的值，方法参数为

`fieldChange({ field, name, value, path })`