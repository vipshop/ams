---
Router: Router 导航路由
---
# Router 导航路由

### 基础用法

<ClientOnly>
<block-router-demo blockName="defaultRouter" onlineDemo="https://codepen.io/w3cmark/pen/mdbLaaw"/>
</ClientOnly>

### slotBlocks 配置

#### 菜单头部slot block

配置子block的slot为`menuTop`，可以插入在菜单头部

<ClientOnly>
<block-router-demo blockName="menuTopRouter" onlineDemo="https://codepen.io/w3cmark/pen/rNBvooE"/>
</ClientOnly>

#### 菜单底部slot block

配置子block的slot为`menuBottom`，可以插入在菜单底部

<ClientOnly>
<block-router-demo blockName="menuBottomRouter" onlineDemo="https://codepen.io/w3cmark/pen/mdbLavw"/>
</ClientOnly>

#### 导航的位置slot block

配置子block的slot为`nav`，可以插入在导航的位置。比如下面例子插入了两个操作按钮“反馈”和“帮助”，
配置子block的slot为`nav-left`，可以插入在导航左侧的位置。比如下面例子插入文本“左侧导航插槽”。

<ClientOnly>
<block-router-demo blockName="navRouter" onlineDemo="https://codepen.io/w3cmark/pen/KKPRbJr"/>
</ClientOnly>



### 结构

```js
export interface Route {
  path: string, // 路由地址
  name: string, // 路由名
  class:? string,   // 路由添加class类名控制，0.17.12+支持
  block?: string, // 渲染block名
  redirect?: string, // 重定向地址
  children?: Array<Route>, // 子路由
  meta?: {
    icon?: string, // 对应的图标：参考http://element-cn.eleme.io/#/zh-CN/component/icon，如 'info' 对应 'el-icon-info'
    hasMenu?: boolean, // 是否显示导航菜单面包屑，默认true
    hidden?: boolean, // 是否在左侧导航菜单显示，默认false
    roles?: Array<string>, // 路由权限角色，data内包含对应的角色才可见改路由
    noRedirect?: boolean, // 对应面包屑是否禁用跳转，默认为false
  }
}
export interface RouterBlock {
  type: 'router',
  router: {
    mode?: 'hash' | 'history' | 'abstract',
    base?: string, // 更多选项参考：https://router.vuejs.org/zh/api/#linkexactactiveclass
    showMenu?: boolean,   // 默认为true, false时隐藏所有路由菜单  0.8.6+支持
    uniqueOpened?: boolean, // 是否只保持一个子菜单的展开，展开当前折叠其他，默认为false 0.17.12+支持
    routes: Array<Route>,
    defaultBreadcrumb?: boolean, // 默认为true，会把首个route作为默认首页加到所有面包屑，设置为false禁用此行为， 0.7.5+支持
    forcedRefresh?: boolean, // 默认为false，点击当前菜单（非外链）是否强制刷新渲染，0.15.12+支持
  },
  data?: {
    roles?: Array<string>, // 当前用户权限角色，用户需要包含路由要求的roles权限才能看到对应菜单
    logo?: string, // 系统logo（只有使用vipshop的UI主题才会显示）
    title?: string, // 系统标题（只有使用vipshop的UI主题才会显示）
    userImg?: string, // 用户头像（如果头像为空，则用默认头像）
    userName?: string // 用户名字（如果名字为空则不展示用户信息模块）
  },
  on?: {
    // 这里可以在生成router实例时注册事件，如beforeEach，详见 [ Router 实例方法 ](https://router.vuejs.org/zh/api/#router-%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)
  }
}
```