# 区块（block）

区块是AMS的基础组成单元，整个页面由多个 `block` 组合嵌套组成，每个 `block` 有自己的事件、行为、操作

<ClientOnly>
<scrimba href="https://scrimba.com/c/cV8vRKuR" title="字段和区块" />
</ClientOnly>

## 注册 block

注册一个name为 `formView` 的block

```js
ams.block('formView', {
  type: 'form', // 区块类型：from代表表单
  resource: 'demo', // 区块依赖的资源
  ctx: 'view', // 区块形态，view代表纯展示
  data: {}, // 区块使用到到数据
  events: { // 区块事件
    init: '@read @console'
  },
  actions: { // 区块行为
    console() {
      console.log('@console action', this.block.data.id);
    }
  }
});
```

以上注册了 `formView` block

## 使用 block
> 注意：如果在 template 中使用 `<ams-block />`，需要先在 `main.js` 中安装 `ams`，引入 ams 中的区块和字段。文档参见[通过npm安装](https://vipshop.github.io/ams/api/#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F)

```js
import ams from '@ams-team/ams';
Vue.use(ams); // 类似 Vue.use(element-ui);
```

每个block本质都是[Vue组件](https://cn.vuejs.org/v2/guide/components-registration.html)，可以通过区块名 `name` 来引用：`<ams-block name="formView" />`，完整示例如下：

```html
<template>
    <ams-block name="formView" />
</template>
<script>
    import ams from '@ams-team/ams';
    // 注册资源
    ams.resource('demo', {
        key: 'id',
        api: { // 数据接口相关
            prefix: '//www.yournana.club/vipshop/',
            list: 'list'
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
    // 注册区块
    ams.block('formView', {
        type: 'form',
        resource: 'demo',
        ctx: 'view',
        data: {},
        events: {
            init: '@read @console'
        },
        actions: {
            console() {
                console.log('@console action', this.block.data.id);
            }
        }
    });
</script>
```

## 子 blocks

可以通过子 blocks 配置实现 `block` 的多级嵌套，组合成复杂的页面

```js {3,7}
ams.block('dialog', {
  type: 'dialog', // 弹窗类型区块
  blocks: {
    form: {
      type: 'form', // 嵌套一个表单区块
      resource: 'resource',
      blocks: {
        div: {
          type: 'component', // 表单区块再嵌套一个万能区块
          options: {
            is: 'div'
          }
        }
      }
    }
  }
});
```

### 插入指定位置的具名插槽 block

子 blocks 可以通过配置 `slot` 指定插入位置，不指定则插入到其内部主内容之后。

如 router 的 block 支持配置 slot 为 `menuTop`、`menuBottom`、`nav` 来使 block 插入到菜单头部，菜单底部，导航的位置（具体和对应 block 开放的插槽位置有关）

```js {5}
{
    type: 'router', // 路由区块
    blocks: {
        menuBottom: {
            slot: 'menuBottom', // 指定插槽位置
            type: 'component',
            options: {
                is: 'img'
            },
            style: {
                width: '100px',
                height: '100px',
                backgroundColor: '#007'
            },
            props: {
                src: '//b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
            }
        }
    }
}
```

## 异步 block

block 支持返回 `Promise` 的函数，会在对应 block 就绪（`resolve`）后渲染指定 block，支持嵌套

```js
ams.block('formViewAll', function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('resolve formViewAll')
            resolve({
                type: 'form',
                resource: 'resource',
                ctx: 'view',
                data: {
                    testRadio: 'c'
                },
                style: {
                    width: '50%'
                },
                events: {
                    init: '@read @console'
                },
                actions: {
                    console() {
                        console.log('@console action', this.data.id)
                    }
                }
            });
        }, 1000)
    })
});
```
## actions

- 类型：`{ function({ name: string, value: any }): void }`
- 默认值：`undefined`

配置示例：

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
        // promt直接使用方式，参考https://element.eleme.cn/#/zh-CN/component/message-box
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
| resetData | 无 | 重置block的data默认值
| clear | 无 | 同resetData，重置block的默认值
| showBatch | 无 | block-imagelist 显示 批量操作的按钮
| hideBatch | 无 | block-imagelist 退出 批量操作的按钮
| routerPush | Promise | 跳转新页面
| routerReplace | Promise | 重定向当前页
| routerGo | Promise | 回退或者前进 页面
| resetData | Promise | (ams >= 0.5.0) 重置block数据（如表单重置）
| wait | Promise | (ams >= 0.7.5) 等待0ms后继续（等待ui更新队列完成）可以通过$arg传入需要等待的ms数，默认为0
| addItemAfter | Promise | (ams >= 0.7.7) 在列表后面显示增加一项数据的表单，可通过参数指定resource和blockConfig
| addItemDialog | Promise | (ams >= 0.7.7) 弹窗增加一项数据，可通过参数指定resource和blockConfig
| editItemAfter | Promise | (ams >= 0.7.7) 在列表后面显示修改改项数据的表单，可通过参数指定resource和blockConfig
| editItemDialog | Promise | (ams >= 0.7.7)  弹窗修改该项数据，可通过参数指定resource和blockConfig
| addItemDrawer | Promise | (ams >= 0.7.7)  弹窗修改该项数据，可通过参数指定resource和blockConfig
| editItemDrawer | Promise | (ams >= 0.7.7)  弹窗修改该项数据，可通过参数指定resource和blockConfig
| viewItemDialog | Promise | (ams >= 0.32.3)  弹窗修改该项数据，可通过参数指定resource和blockConfig
| viewItemDrawer | Promise | (ams >= 0.32.3)  弹窗修改该项数据，可通过参数指定resource和blockConfig

可以自定义actions，可被`events`中使用，如果定义跟内置action同名则会覆盖默认提供方法

field的数据变更触发可以通过在actions中定义`fieldChange`获取对应的值，方法参数为

`fieldChange({ field, name, value, path })`


## events

- 类型：`object且{ [field: string]: string }`
- 默认值：`undefined`

`events`是用来配置 `block` 的事件流，采用链式 `action` 调用，前一个 `action` 执行完之后再调用下一个 `action`，多个 `action` 之间用空格隔开

事件流配置示例：

```javascript
events: {
    init: '@read',
    submit: '@validate @confirm:确认提交吗? @update',
    cancel: '@cancel',
    dialog: '@demo-dialog.show'
}
```

`init`是AMS给每个区块内置的 `event`，在区块每次初始化时都会执行。

::: tip
如果希望多个异步action顺序依此执行，需要将action函数返回一个Promise或者使用async函数
:::

如`submit: '@validate @confirm:确认提交吗? @update'`表示为：

执行`validate` -> 执行`confirm`，传参`确认提交吗` -> 执行`update`

- action的传参有以下几种：

    - 通过`@action:args`传参，如`@confirm:确认提交吗?`，调用`confirm`事件，传参`确认提交吗`

    - 通过`@block.action:args1,args2`传参，如`@demo-dialog.show`，调用`demo-dialog`block中的`show`事件

## operations

通过`operations`的配置可以配置各种操作、响应用户事件，用户对operation进行操作后会产生事件，通过对事件的处理就可以完成对用户操作的反馈

operations结构类型如下：

```js
{
	[actionField: String]: {
		type: 'button' | 'icon' | 'reset' | 'field',
		event?: String,
		slot?: String,
		field?: String | FieldConfig, // field 特有
		props: {
			[field: String]: any
		},
		show?: String | Object | Function,
		style: {
			[styleName: String]: String
        },
        changeConfig: Function(field: Object, context: Object)
	}
}
```

配置示例：

```js
operations: {
    editItem: {
        type: 'button',
		props: {
			type: 'primary',
			icon: 'el-icon-edit',
			circle: true
		}
	},
	removeItem: {
		type: 'button',
		props: {
			type: 'danger',
			icon: 'el-icon-delete',
			circle: true
        },
        show: 'testSwitch' // String类型：代表通过获取名为“testSwitch”的field值（this.data['testSwitch']）
    },
	deleteItem: {
		type: 'button',
		props: {
			type: 'danger',
			icon: 'el-icon-delete',
			circle: true
        },
        show: { // Object类型：代表通过获取名为“testSwitch”的field值和value指定的值进行比较，相等（==）就返回true，否则返回flase
            name: 'testSwitch',
            value: '1'
        }
	},
	statusItem: {
		type: 'button',
		props: {
			type: 'danger',
			icon: 'el-icon-delete',
			circle: true
        },
        show(data) { // Function类型：适合取决于多个条件比较后的结果
            console.log(data, this)
            return data.id === 1 && data.testSwitch;
        }
	}
}


```
参数说明
- `actionField`：对应blocks中的events名字，详细用法参考：[event 与 action](/block/action.html)
- `event`：指定调用event名，优先级大于 actionField
- `slot`：指定operation所在插槽，如list支持 `searchs` 和 `multipleSelect` 定制搜索操作和多选操作
- `field`：指定使用的field配置，使用String刚会使用本block内同名的field配置
- `props`：透传至operation根节点的props配置
- `style`：透传至operation根节点的style配置
- `show`：满足show条件的才会显示，在list内是该行的值，在form内是data的值，如`show:{name:'test',value:2}` 当这一行的name字段的值为2时该operation会显示

点击前往[更深入的了解operations](/block/deep-operation.html)

## props 属性、on 事件、style 样式的定制

block支持透传props、on和style 至 block 内部根元素（原生节点或者element-ui节点）

如

```js
{
    type: 'component',
    options: {
        is: 'img'
    },
    style: {
        width: '100px',
        height: '100px',
        backgroundColor: '#007'
    },
    on: {
        click(){console.log('click')}
    },
    props: {
        src: '//b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png'
    }
}
```

等价于

```vue
<img @click="()=>{console.log('click')}" style="{
        width: '100px',
        height: '100px',
        backgroundColor: '#007'
    }" src="//b.appsimg.com/upload/vivaadmin/2018/11/07/69/1541579376290922128.png"/>
```

## block 通用配置

| 参数 | 类型 | 是否必传 | 说明
| -- | -- | -- | --
| type | string | 是 | block的类型
| resource | string、object | 是 | 资源key或者是具体的资源
| data | object | 否 | block数据默认值
| ctx | string | 否 | 'edit' 为编辑态、'view' 为显示态
| options | object | 否 |  block选项
| config | object | 否 |  全局配置、同ams.config(config)
| fields | object | 否 | 可以合并覆盖当前block的资源内的field配置，点击前往[更深入的了解fields](/api/field.html)
| style | object | 否 | 样式配置
| props | object | 否 | 补充属性，用于添加DOM属性或者透传至element组件，如disabled
| events | object | 否 | 配置events
| actions | object | 否 | 配置actions
| operations | object、array | 否 | 配置operations
| blocks | object、array | 否 | 子blocks配置，如为object则为具体的配置内容，如为array则是子blocks的key列表
| render | string、boolean | 否 | 如果为true会自动渲染到body内，或者指定已有节点的querySelector

我们已经学习了`字段`和`区块`，接下来，我们来学习如何用AMS配置一个完善的单页面案例

[下一节：案例教程](/api/demo.html)
