# 项目嵌入

## 已有项目嵌入AMS

### iframe嵌入

利用iframe可以嵌入外部域名网页的特性，可以已经运行的项目中嵌入使用AMS开发的网页，详见：[iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

### 局部组件嵌入

可以使用区块名name引用方式：[使用block >>](/api/block.html#使用-block)

### 完整页面嵌入

如果AMS项目是多个页面，直接设置[Route](/block/router.html#/)中meta的hasMenu为false，通过隐藏导航菜单面包屑得到多个单独的AMS页面

## AMS嵌入已有项目

### iframe嵌入

利用iframe可以嵌入外部域名网页的特性，可以已经运行的项目中嵌入使用非AMS开发的网页，详见：[iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

```
iframeBlock: {
  type: 'component',
  options: {
    is: 'iframe'
  },
  props: {
    src: 'http://xxx.vip.com/id=11',
    frameborder: 0
  }
}
```

### vue动态组件

利用vue的[动态组件](https://cn.vuejs.org/v2/guide/components.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6)特性，并结合ams的[动态区块 component](/block/component.html)，可以引入使用vue注册的组件

步骤一：在main.js等项目入口注册一个[vue组件](https://cn.vuejs.org/v2/guide/components.html)，组件命名为`button-counter`

步骤二：注册一个ams动态区块，options的is命名为vue的组件名`button-counter`

```js
  ams.block('ams-button-counter-block', {
    type: 'component',
    options: {
      is: 'button-counter'
    }
  })
```

步骤三：如果引入组件需要用到ams内部的数据，可以通过在props中传参，即可向vue组件的[props](https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87-Prop-%E5%90%91%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BC%A0%E9%80%92%E6%95%B0%E6%8D%AE)传递参数

```js
  ams.block('ams-button-counter-block', {
    type: 'component',
    options: {
      is: 'button-counter'
    },
    props: {
      data: {
        count: 2
      }
    }
  })
```

### router配置component

方式一：
```js
import outsideFile from './outside-file';
{
  name: '引入外部文件',
  path: 'cases-outside',
  children: [
    {
      name: 'Vue文件引入A',
      path: 'fileA',
      component: outsideFile
    }
  ]
}
```

方式二：
```js
{
  name: '引入外部文件',
  path: 'cases-outside',
  children: [
    {
      name: 'Vue文件引入B',
      path: 'fileB',
      component: () => import('./outside-file')
    },
  ]
}
```

## 多种框架混用

包含普通Vue、ncform和AMS组成的在线Demo演示：[点击查看Demo](https://jsbin.com/nizuvigije/1/edit?html,output)

:::tip
只能适用于ams或ncform在单独的页面运行，暂不支持在ams中配置ncform的组件
:::
