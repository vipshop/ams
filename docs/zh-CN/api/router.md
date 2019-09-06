# 路由与菜单导航

后台页面的 `菜单导航` `各页面路由` `每个页面的内容` `页面跳转` `菜单权限` `面包屑` 等都可以通过 `Router` block 配置

详细api参考：[Router 导航路由](../block/router.md)

## 配置示例
``` js
{
    type: 'router',
    data: {
        roles: ['admin']
    },
    router: {
        // defaultBreadcrumb: false, //是否将第一个菜单作为“首页”一直出现在面包屑，默认为 true
        // mode: 'history', // 配置路由模式，默认为 hash，可选值: "hash" | "history"
        // base: '/app/', // 要在history模式下才会发挥作用
        routes: [
            {
                name: '首页',
                path: '',
                redirect: '/list',
                meta: {
                    icon: 'menu'
                }
            },
            {
                name: '404',
                path: '404',
                block: '404',
                meta: {
                    hasMenu: false,
                    hidden: true
                }
            },
            {
                name: '列表',
                path: 'list',
                block: 'list',
                meta: {
                    roles: ['admin', 'edit'],
                    icon: 'document'
                },
                children: [
                    {
                        name: '编辑',
                        path: 'edit',
                        block: 'formEdit'
                    },
                    {
                        meta: {
                            roles: ['admin'， 'view']
                        },
                        name: '查看',
                        path: 'view',
                        block: 'formView'
                    }
                ]
            },
            {
                name: '外链',
                meta: {
                    icon: 'star-off'
                },
                path: 'https://vipshop.github.io/ams/'
            },
            {
                name: '跳404',
                redirect: '404',
                meta: {
                    icon: 'error'
                }
            },
            {
                path: '*',
                redirect: '404'
            }
        ]
    }
}
```

![example](../assets/block-router-example.png)

### 菜单导航和路由地址

菜单导航和路由地址是根据 `router.routes` 的 `route` 配置嵌套配置而成

如 `列表` 页的页面路由为 `/list` 同时其渲染的block名为 `list`，菜单项会有一个顶层的 `列表` 菜单，其下有两个子菜单：`编辑` 和 `查看`，对应的页面路由为 `/list/edit` 和 `/list/view`

### 权限控制

每个菜单可以在`meta`内配置`roles`，需要 `data.roles` 有对应的权限才能看到对应的菜单，如当前权限为 `edit`，则无法看到 `查看` 页（需要具备 `view` 或者 `admin` ）

如果`data.roles`变更，可以调用`this.initRouter()`重置路由表和菜单

### 面包屑

面包屑会根据`routes`的配置自动生成，点击会跳转对应页面，如有页面不希望点击跳转，可以配置其 `meta.noRedirect` 为 `true`