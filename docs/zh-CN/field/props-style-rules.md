# props、style、rules定制

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
