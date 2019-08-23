# Chart 图表

- 定制图表block基于echart插件实现
- 与其他block区别在于新增options配置项，options配置规则同echart配置对应
- 其他机制实现同ams基础block
- 区别：
    - 对options中的数据可使用'data.xxx'字符标识与block.data数据动态绑定
    - 数据变化只需关注block.data，即可实现图表更新
