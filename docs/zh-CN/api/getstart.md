# 快速上手

## 安装ams

### 方式一：通过npm安装（依赖node环境）
详见[通过npm安装](./npm.md)

### 方式二：直接用 script 引入

注意要先引入vue element-ui的依赖

```html
<script src="https://h5rsc.vipstatic.com/ams/ams@0.32.0.js"></script>
```


## 开始使用


然后就可以通过`ams.block`传入配置生成后台，下面是完整代码

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui@2.11.1/lib/theme-chalk/index.css"/>
</head>

<body></body>
<script src="https://unpkg.com/vue@2.6.10/dist/vue.min.js"></script>
<script src="https://unpkg.com/element-ui@2.11.1/lib/index.js"></script>
<script src="https://unpkg.com/@ams-team/ams/lib/ams.js"></script>
<script>
var config = {
    resources: {
        /**
         * 配置数据（资源）
         * 首先我们需要配置`资源`、用于描述接口的`字段`组成、以及`api`的存取地址
         */
        res: {
            api: {
                // api前缀
                prefix:
                    '//www.yournana.club/vipshop/',
                // 读取数据接口
                read: 'read',
                // 更新数据接口
                update: 'update',
                // 更新数据接口
                list: 'list'
            },
            fields: {
                // 定义id和testRate两个字段
                id: {
                    type: 'text',
                    label: '文本'
                },
                testRate: {
                    type: 'rate',
                    label: '评分'
                }
            }
        }
    },
    /**
     * 配置区块
     */
    blocks: {
        /**
         * 接下来我们需要配置`区块`、用于表单的编辑，并配置一个更新数据的操作按钮、并进行数据校验
         */
        formEdit: {
            type: 'form',
            ctx: 'edit',

            // 指定block使用的资源为上面声明的res
            resource: 'res',

            /**
             * 配置操作
             */
            operations: {
                // 配置一个提交表单操作，触发submit event
                base: 'FORM_SUBMIT'
            },

            events: {
                init: '@read',
                submit: '@validate @update'
            }
        },
        /**
         * 接下来我们配置一个列表区块
         */
        listBlock: {
            type: 'list',

            // 指定block使用的资源为上面声明的res
            resource: 'res',

            events: {
                init: '@list'
            }
        }
    },
    render: true
};

// 注册block、使用配置生效
ams.block('demo', config);
</script>
</html>

```

我们已经成功完成了第一个ams后台的配置了，通过简单的配置，不需要开发，完成具备了数据读取、数据展示、数据编辑、数据列表、数据校验等基本功能的后台（点击 **`SOURCE`** 可在线编辑）

<iframe width="100%" height="900" src="//jsrun.net/sehKp/embedded/result,js/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>