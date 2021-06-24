---
API: API 配置
---

# API 配置

## type

- 类型：`string`
- 默认值：`undefined`

定义区块的类型，目前可用类型有表单`form`、列表`list`、弹窗`dialog`、网格布局`Grid`等等

## resource

- 类型：`string`
- 默认值：`undefined`

该block对应注册的resource名称，如`resource: 'demo'`对应的是`ams.resource('demo', Config)`

## ctx

- 类型：`string`
- 默认值：`view`

表单的显示类型，可选值为`view`（预览） `edit`（编辑）

若在block的fields有定义ctx，则优先级的判断如下：

**ctx**

优先级1：检查blocks中fields对应field是否有`ctx`，如果有则应用

优先级2：检查注册的resource中对应的field是否有`ctx`，如果有则应用

优先级3：应用blocks本身的`ctx`，若无设置则默认为`view`

**props**

优先级1：检查blocks中fields对应field是否有`props`，如果有则应用

优先级2：检查注册的resource中对应的field是否有`ctx`，如果有则应用

优先级3：使用默认field的props。附默认列表

## show

- 类型: `boolean | function`
- 默认值: `undefined`

控制整个block的显示状态，如果show最终值为false则不渲染改组件

show可以接受`function`类型，接收两个参数`block`（指向block的实例) `data`（指向block.data），返回值需是`boolean`值

## style

- 类型：`object`
- 默认值：`undefined`

给block添加样式，如
```js
style: {
    width: '50%'
}
```

## data 

- 类型：`object`
- 默认值：`undefined`

```js
data: {
    testRadio: 'c'
}
```

内置可赋值的data为：

**data.page**

当type为`list`时有效，设置page数值

**data.total**

当type为`list`时有效，设置total数值

**data.list**

当type为`list`时有效，设置list的初始化数据

**其他赋值**

当type为`form`，可以设置对应field的值作为默认展示的值，如`data: { testRadio: 'c' }`

当type为`error`, data配置如下
```js
data: {
    img: 'Url | Base64',    
    title: 'String',      // 默认为Error
    subtitle: 'String'    // 默认为Opps，some error happen !
}
```

## events

详见[event 与 action](../block/action.md)

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

如`submit: '@validate @confirm:确认提交吗? @update'`表示为：

执行`validate` -> 执行`confirm`，传参`确认提交吗` -> 执行`update`

- action的传参有以下几种：

    - 通过`@action:args`传参，如`@confirm:确认提交吗?`，调用`confirm`事件，传参`确认提交吗`

    - 通过`@block.action:args1,args2`传参，如`@demo-dialog.show`，调用`demo-dialog`block中的`show`事件

## actions

详见[event 与 action](../block/action.md)

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
    }
}
```

内置的action有详见：

[event 与 action](../block/action.md)

可以自定义actions，可被`events`中使用，如果定义跟内置action同名则会覆盖默认提供方法，异步操作需要返回 `Promise` 或者使用 `async 函数`

field的数据变更触发可以通过在actions中定义`fieldChange`获取对应的值，方法参数为

`fieldChange({ field, name, value, path })`

## fields

- 类型：`object`
- 默认值：`undifined`

```js
fields: {
    id: {
        label: '新id名',
        props: {
            disabled: false
        }
    },
    testPassword: {
        props: {
            disabled: false
        }
    },
    // 字段隐藏
    testAudio: false
}
```

用于block级别作用域的fields，重置`resource`中的默认配置

## operations

- 类型：`object`
- 默认值：`undefined`

`type`代表按钮类型，有`button` `icon` `dropdown`类型。

`slot`代表按钮的位置，如果没有设置slot的位置，默认会在每行的操作项中，若设置，目前有以下的配置：

- `searchs` 搜索栏；
- `multipleSelect`复选栏，当复选框有值时才会出现

`tooltip`代表hover到按钮上出现的文案

`event`代表点击该按钮时，会触发的event同名事件

`show`代表按钮出现的条件，可以配置string或者function(content)，content是按钮所在行的数据

`changeConfig` 可以对该字段的配置做处理，接受function(field, context)，其中field是指该字段的配置，content是按钮所在行的数据

```js
operations: {
  dropdown: {
    slot: 'searchs',
    type: 'dropdown',
    label: '更多搜索',
    event: 'list',
    props: {
      placeholder: '搜索...'
    },
    style: {
      width: '300px'
    },
    fields: {
      department_id: true,
      activity_type: true,
      category: true,
      grade: true,
      status: true,
      act_no: true,
      start_time: true,
      end_time: true
    }
  },
  act_id: {
    slot: 'searchs',
    type: 'field',
    field: 'act_id',
    label: 'id'
  },
  title: {
    slot: 'searchs',
    type: 'field',
    field: 'title',
    label: '活动名称'
  },
  search: {
    slot: 'searchs',
    type: 'button',
    props: {
      type: 'primary'
    },
    label: '搜索',
    event: 'list'
  },
  reset: {
    slot: 'searchs',
    type: 'reset',
    label: '重置',
    event: 'reset'
  },
  deleteMulti: {
    slot: 'multipleSelect',
    type: 'button',
    label: '删除',
    event: 'deleleAction'
  },
  delete: {
    type: 'button',
    props: {
      size: 'mini',
      type: 'danger',
      icon: 'el-icon-delete',
      circle: true
    },
    tooltip: '删除',
    show: 'operations.allow_del'
  },
  copy: {
    type: 'button',
    props: {
      size: 'mini',
      type: 'primary',
      icon: 'el-icon-document-copy',
      circle: true
    },
    tooltip: '复制活动'
  },
  approve: {
    type: 'button',
    props: {
      size: 'mini',
      type: 'primary',
      icon: 'el-icon-check',
      circle: true
    },
    tooltip: '审核通过',
    show(context) {
      return context.status !== ActivitiesAuditStatus.Draft ? context.operations.allow_audit : false
    },
    changeConfig(field, context) {
      return field
    }
  },
  reject: {
    type: 'button',
    props: {
      size: 'mini',
      type: 'danger',
      icon: 'el-icon-close',
      circle: true
    },
    tooltip: '审核不通过',
    show(context) {
      return context.status !== ActivitiesAuditStatus.Draft ? context.operations.allow_audit : false
    }
  }
}
```
另外提供了简化的常用配置，目前有：

```js
operations: {
    BASE: 'FORM_SUBMIT'
}
等同于
operations: {
    submit: {
        type: 'button',
        label: '提交',
        props: {
            type: 'primary'
        }
    }
}
```

上述例子中，当点击submit按钮时，会调用`events`中的同名events方法，若没有绑定同名event则调用同名action

点击前往[更多operations相关介绍](/api/deep-operation.html)

## blocks

- 类型：`object`
- 默认值：`undefined`

可以定义嵌套的blocks数据，如
```js
adminEditDialog: {
    type: 'dialog',
    data: {
        title: '编辑',
        visible: false
    },
    events: {
        submit: 'editDialogForm.submit'
    },
    actions: { },
    operations: {
        submit: {
            type: 'button',
            label: '提交',
            props: {
                type: 'primary'
            }
        },
        hide: {
            type: 'button',
            label: '关闭'
        }
    },
    blocks: {
        editDialogForm: {
            type: 'form',
            resource: 'resource-admin',
            ctx: 'edit',
            events: {
                init: '@read',
                submit: '@validate @update adminListView.init @adminEditDialog.hide'
            }
        }
    }
}

// 上述代码会注册 adminEditDialog 和 editDialogForm 两个blocks
// 其中editDialogForm包含在adminEditDialog中
```

## render

- 类型： `boolean | string`
- 默认值：`undefined`

根据`render`的参数注册一个`ams-block`，可用于`unpkg版本（直接用 script 引入）`的ams

若`render`值为true，或者根据`document.querySelector(render)`查询不到对应dom节点，则注册一个默认的`ams-block`

若`render`值根据`document.querySelector(render)`能查询到，则创建一个在该DOM结构下的`ams-block`

## options

- 类型：`object`
- 默认值：`{}`

详见各种block的配置。
比如block的type为`chart`时：
```js
// 图表配置
options: {
    // 图表类型，line 折线图，bar 柱状图，pie 圆饼图
    type: 'line',
    // 图表的标题和子标题
    title: {
        text: 'data.title',
        subtext: '我是副标题'
    },
    // 图例显示
    legend: {
        data: 'data.legend'
    },
    // x轴数据
    xAxis: {
        data: 'data.xAxis'
    },
    // 图标的提示组件，全局设置
    tooltip: {
        trigger: 'axis'    // 触发类型, axis 坐标轴触发
    },
    series: [
        {
            name:'邮件营销',
            data: 'data.series1'
        },
        {
            name:'联盟广告',
            data: [220, 182, 191, 234, 290, 330, 310]
        }
    ]
}
```

## props

- 类型：`object`
- 默认值：`undefined`

主要是用来透传Element组件的属性配置，详见各种block的配置。

## on

- 类型：`object`
- 默认值：`undefined`

主要是用来透传Element组件的方法配置，详见各种block的配置。


## filters <Badge text="list独有"/>

- 类型：`object`
- 默认值：`{}`

***block的type为`list`时独有字段***

设置列表的过滤条件，如

```js
filters: {
    testCheckbox: {
        multiple: false,
        remote: true
    },
    testSelect: {
        multiple: true,
        remote: false
    }
}

// `multiple` 表示是否支持多选，boolean值
// `remote`   表示是否支持远程过滤，boolean值
```

## sorts <Badge text="list独有"/>

- 类型：`object且{ [field: string]: boolean }`
- 默认值：`{}`

***block的type为`list`时独有字段***

列表排序设置，如
```js
sorts: {
    testInputnumber: true
}
```

## pageSize <Badge text="list独有"/>

- 类型：`number`
- 默认值：`20`

***block的type为`list`时独有字段***

设置分页时每页的条数，赋值优先级为`block.data.pageSize` -> `block.pageSize`


## router <Badge text="router独有"/>

- 类型：`object`
- 默认值：`undefined`

***block的type为`router`时独有字段***