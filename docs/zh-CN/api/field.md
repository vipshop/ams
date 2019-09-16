# 字段（fields）

对于 `field` 的配置可以配置在 `resource` 的 `fields` 属性内，也可以配置在 `block`的 `fields`属性内。而配置在 `block` 内都 `fields` 将覆盖合并该区块引用的资源内的字段

## resource内声明field
```js
ams.resource('resource-name', {
  demo: {
    fields: {
      id: {
        type: 'text',
        label: 'id',
        ctx: 'view'
      },
      title: {
        type: 'text',
        label: '标题'
      },
      content: {
        type: 'textarea',
        label: '内容'
      },
      create_time: {
        type: 'datetime',
        label: '创建时间',
        ctx: 'view'
      },
      update_time: {
        type: 'datetime',
        label: '更新时间',
        ctx: 'view'
      }
    }
  }
})
```

## props 属性、style 样式、rules表单校验的定制

可以通过配置 `props` 透传至field根元素

可以通过配置 `style` 控制field样式

可以通过配置 `rules` 配置field在表单内的校验规则，校验规则参见 https://github.com/yiminghe/async-validator

```js {5,14,17}
{
  testText: {
      type: 'text',
      label: '文本',
      rules: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
          }
      ],
      style: {
          width: '100px'
      },
      props: {
          'suffix-icon': 'el-icon-service'
      }
  }
}
```

## get、set与view配置

每一种field类型都会有默认的get、set、view配置，用于进行字段的服务器数据与本地数据之前的转换

![get-set-view-flow](../assets/api/get-set-view-flow.jpg)

如图，当ctx为 `edit` 在编辑状态下时，发生作用的get与set，get与set要一一对应；当ctx为 `view` 在显示状态时，发生作用的是view。

一般情况下，是不需要关心和配置get、set、view的，当遇到以下场景，可以通过配置get、set、view来实现

### 场景一：默认的数据格式不满足需求，需要进行格式转换

比如类型为 `datetime` 的field，其默认的数据格式是时间戳（ 13位 int ）,我们想把他修改成为字符串并加上标记、同时对展示输出进行自定义格式化，可以这样配置

<ClientOnly>
<api-field-demo blockName="getSetView"/>
</ClientOnly>
