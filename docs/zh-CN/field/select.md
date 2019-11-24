---
Select: Select 选择器
---
# Select 选择器

> 默认是多选，可以通过 `props['multiple']: false` 配置实现单选。

### 基础用法

<ClientOnly>
<field-select-demo blockName="selectField1" onlineDemo="https://codepen.io/w3cmark/pen/abojRbg"/>
</ClientOnly>

### 增加全选

设置props中的`select-all`为`true`

<ClientOnly>
<field-select-demo blockName="selectField2" onlineDemo="https://codepen.io/wuzebin/pen/RwwWEJZ"/>
</ClientOnly>

### 传值
String，如`"a,b,c"`

### 远程搜索 

可以通过BASE: 'SELECT_REMOTE' 让select具有远程搜索的能力，需要配置 `remoteConfig`，用户输入关键字时会调用remoteConfig.action，并携带当前关键字作为参数（参数名为配置的remoteConfig.queryKey）

可配置的选项为：（ams@0.7.10+）
- 成功code（全局的resource.api.successCode，或者block内resource.api.successCode）
- remoteConfig.labelKey：label的key名（默认为name）
- remoteConfig.valueKey：value的key名（默认为id）
- remoteConfig.queryKey：请求参数的key名（默认为query）
- remoteConfig.action：请求的接口地址
- remoteConfig.dataPath：数据结构的路径（默认为data.list）
- remoteConfig.debounce：用户键入关键字后的缓冲间隔（默认为500、单位ms）
- remoteConfig.isInitEmpty：回填无值时是否发起请求（默认为false）
- remoteConfig.isCache：通过action缓存合并options数据，缓存数据只会用于回填，array类型的options不支持cache（默认为true）
- remoteConfig.isLock：通过action锁定请求、多个同action不会同时发起请求（默认为true）
- remoteConfig.isMiniBackfill：最小化options回填，推荐select使用，回填时只会提供当前值对应的options（默认为true）
- remoteConfig.transform：transform函数，可以定制options数据的组装过程，参数为 $field（当前field的vue实例）、 data（接口数据），返回值为组装好的options
- remoteConfig.request：request函数（promise或者async函数），可以定制请求、用于一些需要动态请求参数的场景，参数为 $field（当前field的vue实例）、 query（关键字或者值）、isBackfill（是否是回填），返回值通过ams.request请求的完整res
- remoteConfig.isInitRemoteOptions：是否初始化的时候触发远程搜索

#### 场景一：远程select、关键字搜索、最小化回填、options缓存
选项值：

isInitEmpty: false,（默认）

isCache: true,（默认）

isLock: true,（默认）

isMiniBackfill: true,（默认）

#### 场景二：远程checkbox或者radio、通过接口请求options、无关键字搜索、完整列表回填
选项值：

isInitEmpty: true,

isCache: true,（默认）

isLock: true,（默认）

isMiniBackfill: false,

默认的接口数据结构为:
``` json
{
    "code": 0,
    "data": {
        "list": [{
            "name": "a",
            "id": 1
        },{
            "name": "b",
            "id": 2
        }],
        "total": 2
    }
}
```

默认的remoteConfig配置为：

``` js
// 默认remoteConfig
remoteConfig: {
    labelKey: 'name',
    valueKey: 'id',
    queryKey: 'query',
    action: '',
    dataPath: 'data.list',
    debounce: 500,
    // 无参数时发起请求
    isInitEmpty: false,
    // 通过action缓存合并options数据，缓存数据只会用于回填，array类型的options不支持cache
    isCache: true,
    // 通过action锁定请求、多个同action不会同时发起请求
    isLock: true,
    // 最小化options回填，推荐select使用
    isMiniBackfill: true,
    transform(){...},
    async request(){...},
    async remoteMethod(){...}
},
```

``` js
// 远程select框
select: {
    BASE: 'SELECT_REMOTE',
    label: 'select',
    type: 'select',
    remoteConfig: {
        action: 'http://xxx.vip.com/examples/admin/mock/simple.tags.json',
        queryKey: 'requiredName'
    }
}
```


### 在线实验室
<ClientOnly>
<ams-config name="select" type="field"/>
</ClientOnly>

组件更多配置可参考Element：[Select 选择器](http://element-cn.eleme.io/#/zh-CN/component/select)中的Select Attributes
