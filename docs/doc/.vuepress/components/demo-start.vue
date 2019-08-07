<template>
    <div class="demo">
        <ams-block v-if="init" name="demo" />
    </div>
</template>

<script>
import ams from '@ams-team/ams'
import './entry'

export default {
    data() {
        return {
            init: false
        }
    },
    mounted() {
        ams.resource('demoRes', { // ”demoRes“为资源名
            api: {
                prefix: 'https://easy-mock.com/mock/5a0023effbbb09615044cb82/', // 接口前缀
                update: 'update', // 更新表单数据，值为更新接口的path，和接口前缀组成最终请求的url
                read: 'read', // 读取表单数据，值为读取接口的path
            },
            fields: { // 字段
                id: { // “id”为字段名
                    type: 'text', // 字段类型
                    label: '文本' // 该字段显示在页面的文本标签
                },
                testRate: {
                    type: 'rate',
                    label: '评分'
                },
                testTextarea: {
                    type: 'textarea',
                    label: '评语'
                }
            }
        })
        // 注册block、使用配置生效
        ams.block('demo', { // “demo”为区块名
            type: 'form', // 区块类型，“form”代表表单类型
            ctx: 'edit', // 状态，“edit”代表为可编辑
            resource: 'demoRes', // 该区块挂载的资源
            operations: { // 操作
                submit: { // 操作触发的事件名
                    type: "button", // 操作类型
                    label: "提交" // 操作按钮显示的文案
                }
            },
            events: { // 事件流
                init: '@read', // “read”是内置的读取数据操作
                submit: '@update' // “update”是内置的更新数据操作
            }
        });

        this.init = true;
    }
}
</script>
<style scoped>
.demo {
    border: 1px solid #eee;
    padding-top: 20px;
    padding-right: 20px;
}
</style>
