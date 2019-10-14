# get、set、view配置

每一种field类型都会有默认的get、set、view配置，用于进行字段的服务器数据与本地数据之前的转换

![get-set-view-flow](../assets/api/get-set-view-flow.jpg)

如图，当ctx为 `edit` 在编辑状态下时，发生作用的get与set，get与set要一一对应；当ctx为 `view` 在显示状态时，发生作用的是view。

一般情况下，是不需要关心和配置get、set、view的，当遇到以下场景，可以通过配置get、set、view来实现

#### 场景一：默认的数据格式不满足需求，需要进行格式转换

比如类型为 `datetime` 的field，其默认的数据格式是时间戳（ 13位 int ）,我们想把他修改成为字符串并加上标记、同时对展示输出进行自定义格式化，可以这样配置

<ClientOnly>
<api-field-demo blockName="getSetView"/>
</ClientOnly>
