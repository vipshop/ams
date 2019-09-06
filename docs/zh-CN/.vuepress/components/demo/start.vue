<template>
    <el-card shadow="hover" class="demo demo-card">
        <ams-block v-if="init" name="demo" class="demo-card-preview"/>
        <div :class="`demo-card-config ${showConfig ? 'open': ''}`">
            <highlight-code lang="javascript">
                {{ configCode }}
            </highlight-code>
        </div>
        <div class="demo-card-config-btn" @click="toggleDemoCofig">
            <i :class="`el-icon-caret-${showConfig ? 'top': 'bottom'}`"></i>
             {{ showConfig ? '隐藏' : '显示'}}配置
        </div>
    </el-card>
</template>

<script>
import demoMixins from './demo-mixin'
import stringify from '@ams-team/json-stringify'
import beautify from 'js-beautify'

export default {
    mixins: [demoMixins],
    data() {
        return {
            block: {
                quickStart: {
                    resources: { // ”demoRes“为资源名
                        demoRes: {
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
                        }
                    },
                    blocks: {
                        'demoFrom': { // “demo”为区块名
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
                        }
                    }
                }
            }
            
        }
    },
    mounted() {
        // 注册block、使用配置生效
        ams.block('demo', this.block[this.blockName]);
        const stringConfig = stringify(this.block[this.blockName])
        this.configCode = beautify(stringConfig, { indent_size: 2, space_in_empty_paren: true })

        this.init = true;
    }
}
</script>