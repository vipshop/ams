# get、set、view配置

每一种field类型都会有默认的get、set、view配置，用于进行字段的服务器数据与本地数据之前的转换

![get-set-view-flow](../assets/api/get-set-view-flow.jpg)

如图，当ctx为 `edit` 在编辑状态下时，发生作用的get与set，get与set要一一对应；当ctx为 `view` 在显示状态时，发生作用的是view。

一般情况下，是不需要关心和配置get、set、view的，当遇到以下场景，可以通过配置get、set、view来实现

#### get：用于将数据转换为asm组件所需要的格式

比如接口返回一个['a', 'b']的数据，但是ams组件field需要的数据格式是‘a,b’，那么就需要在get函数里面做数据转换，['a','b'] => 'a,b'；当使用ams提供的api接口请求给data赋值，或者直接在action里面用this.data.field = xxx设置的数据都会经过get函数处理为满足ams组件需要的数据格式

#### set：用于将ams组件所默认的格式处理为用户及接口所需要的真实数据

当用户输入input的内容或者选择select框的值这些交互时，ams会设置数据到data里面，然后经过set的处理，在data设置用户所需要的数据格式

#### view：用于在显示状态的数据展示处理

当某一个字段数据的展示保护一些逻辑处理或依赖其他数据来决定展示逻辑和结果，可在view函数里面实现，view方法参数含有value、field、context提供，进行数据逻辑处理然后展示需求的结果

#### 场景一：默认的数据格式不满足需求，需要进行格式转换

比如类型为 `datetime` 的field，其默认的数据格式是时间戳（ 13位 int ）,我们想把他修改成为字符串并加上标记、同时对展示输出进行自定义格式化，可以这样配置

<ClientOnly>
<api-field-demo blockName="getSetView"/>
</ClientOnly>
