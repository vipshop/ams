<template>
    <div class="demo">
        <h4>第一步：选择模板场景</h4>
        <div class="demo-step1">
            <div
                v-for="(item, i) in templates"
                :key="i"
                :class="`templates-list-item ${templateIndex === i ? 'chose' : ''}`"
                @click.stop="onChoseTemplate(i)"
            >
                <i class="el-icon-circle-check"/>
                <div class="img">
                    <img
                        :src="item.image || 'https://h5rsc.vipstatic.com/ams/ams-logo.png'"
                        :alt="item.title"
                    >
                </div>
                <div class="tit">
                    <b>{{ item.title }}</b>
                </div>
            </div>
            <div
                class="templates-list-item more"
                @click.stop="onToTemplate"
            >
                <div class="img">
                    <i class="el-icon-more"></i>
                </div>
                <div class="tit">
                    <b>查看更多模板</b>
                </div>
            </div>
        </div>
        <h4>第二步：配置</h4>
        <div class="demo-step2">
            <el-form :model="configForm" label-width="100px" v-if="templateIndex === 0 && configForm && configForm.resources && configForm.resources.demoResource">
                <el-form-item
                    label="数据接口"
                    :rules="[
                        { required: true, message: '数据接口不能为空'}
                    ]"
                >
                    <el-input v-model="configForm.resources.demoResource.api.prefix" />
                </el-form-item>
                <el-form-item
                    label="显示字段"
                    :rules="[
                        { required: true, message: '字段不能为空'}
                    ]"
                >
                    <el-checkbox-group v-model="checkedFields">
                        <el-checkbox v-for="item in Object.keys(configForm.resources.demoResource.fields)" :label="item" :key="item">
                            {{configForm.resources.demoResource.fields[item].label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item
                    label="功能"
                >
                    <el-checkbox v-model="configFormOptions.search">搜索</el-checkbox>
                    <el-checkbox v-model="configFormOptions.addItem">新增</el-checkbox>
                    <el-checkbox v-model="configFormOptions.editItem">编辑</el-checkbox>
                    <el-checkbox v-model="configFormOptions.removeItem">删除</el-checkbox>
                </el-form-item>
            </el-form>

            <el-form :model="configChartForm" label-width="100px" v-if="templateIndex === 1">
                <el-form-item
                    label="数据接口"
                    :rules="[
                        { required: true, message: '数据接口不能为空'}
                    ]"
                >
                    <el-input v-model="configForm.resources.demoResource.api.prefix" />
                </el-form-item>
                <el-form-item
                    label="图表标题"
                >
                    <el-input v-model="configChartForm.title"/>
                </el-form-item>
                <el-form-item
                    label="图表数据"
                    :rules="[
                        { required: true, message: '字段不能为空'}
                    ]"
                >
                    <el-input type="textarea" rows="10" v-model="configFormFields" />
                </el-form-item>
                <el-form-item
                    label="数据组"
                >
                    <el-checkbox v-model="configChartForm.series1">净收入</el-checkbox>
                    <el-checkbox v-model="configChartForm.series2">毛利额</el-checkbox>
                    <el-checkbox v-model="configChartForm.series3">毛利率</el-checkbox>
                </el-form-item>
            </el-form>

            <el-form :model="configCardForm" label-width="100px" v-if="templateIndex === 2">
                <el-form-item
                    label="数据接口"
                    :rules="[
                        { required: true, message: '数据接口不能为空'}
                    ]"
                >
                    <el-input v-model="configForm.resources.demoResource.api.prefix" />
                </el-form-item>
                <el-form-item
                    label="卡片"
                >
                    <el-checkbox v-model="configCardForm.card1.show">{{ configCardForm.card1.title }}</el-checkbox>
                    <el-checkbox v-model="configCardForm.card2.show">{{ configCardForm.card2.title }}</el-checkbox>
                    <el-checkbox v-model="configCardForm.card3.show">{{ configCardForm.card3.title }}</el-checkbox>
                    <el-checkbox v-model="configCardForm.card4.show">{{ configCardForm.card4.title }}</el-checkbox>
                </el-form-item>
                <el-form-item
                    label="卡片标题"
                    v-if="configCardForm.card1.show || configCardForm.card2.show || configCardForm.card3.show || configCardForm.card4.show"
                >
                    <el-input v-if="configCardForm.card1.show" style="margin-bottom: 15px" v-model="configCardForm.card1.title" />
                    <el-input v-if="configCardForm.card2.show" style="margin-bottom: 15px" v-model="configCardForm.card2.title" />
                    <el-input v-if="configCardForm.card3.show" style="margin-bottom: 15px" v-model="configCardForm.card3.title" />
                    <el-input v-if="configCardForm.card4.show" style="margin-bottom: 15px" v-model="configCardForm.card4.title" />
                </el-form-item>
            </el-form>
        </div>
        <h4>第三步：预览</h4>
        <a @click="onToProduceHTML" style="margin-top: 12px;margin-left:10px" >
            <el-button type="primary">生成HTML文件</el-button>
        </a>
    </div>
    
</template>

<script>
import ams from '@ams-team/ams'
import '../entry'
import stringify from '@ams/json-stringify'
import beautify from 'js-beautify'
import _ from 'lodash'
import templates from './config.js'
import { downloadTemplate } from '../utils/common.js'

export default {
    data() {
        return {
            init: false,
            templateIndex: 0,
            configForm: {},
            checkedFields: ['id', 'testText', 'testTextarea', 'testSwitch', 'testDate', 'testDatetime', 'testImage'],
            configFormOptions: { // 后台场景
                search: false,
                editItem: true,
                removeItem: false,
                addItem: false
            },
            configChartForm: { // 图表场景
                title: '销售与毛利',
                series1: true,
                series2: false,
                series3: false
            },
            configCardForm: { // 卡片场景
                card1: {
                    show: true,
                    title: '信息窗'
                },
                card2: {
                    show: true,
                    title: '任务区'
                },
                card3: {
                    show: true,
                    title: '功能区'
                },
                card4: {
                    show: false,
                    title: '预警区'
                }
            },
            templates: templates,
            templateFileName: ['ams-admin.html', 'ams-chart.html', 'ams-dashboard.html']
        }
    },
    computed: {
        configFormFields: {
            get() {
                let fields
                if (this.templateIndex === 1) {
                    fields = this.configForm.blocks.routerBlock.blocks.chart1.data
                }
                const stringFields = JSON.stringify(fields)
                // return stringFields
                return beautify(stringFields, { indent_size: 4, space_in_empty_paren: true });
            },
            set(newvalue) {
                if (this.templateIndex === 1) {
                    this.configForm.blocks.routerBlock.blocks.chart1.data = JSON.parse(newvalue)
                }
            }
        }
    },
    mounted() {
        this.configForm = this.templates[this.templateIndex].config
    },
    methods: {
        onChoseTemplate(i) {
            this.templateIndex = i
            this.configForm = this.templates[this.templateIndex].config
        },
        filterConfig(){
            const config = ams.utils.deepExtend({}, this.templates[this.templateIndex].config)
            if (this.templateIndex === 0) {
                // 管理后台场景
                if (!this.configFormOptions.search) { // 搜索
                    delete config.blocks.routerBlock.blocks.listBlock1.operations.name
                    delete config.blocks.routerBlock.blocks.listBlock1.operations.list
                }
                if (!this.configFormOptions.editItem) {// 编辑操作
                    delete config.blocks.routerBlock.blocks.listBlock1.operations.editItem
                }
                if (!this.configFormOptions.removeItem) {// 删除操作
                    delete config.blocks.routerBlock.blocks.listBlock1.operations.removeItem
                }
                if (!this.configFormOptions.addItem) { // 新增操作
                    delete config.blocks.routerBlock.blocks.listBlock1.operations.addItem
                }
                for(let key in config.resources.demoResource.fields) {
                    if (this.checkedFields.indexOf(key) < 0) {
                        delete config.resources.demoResource.fields[key]
                    }
                }
            } else if (this.templateIndex === 1) {
                config.blocks.routerBlock.blocks.chart1.options.title.text = this.configChartForm.title
                if(!this.configChartForm.series1) {
                    config.blocks.routerBlock.blocks.chart1.options.series[0] = {}
                }
                if(!this.configChartForm.series2) {
                    config.blocks.routerBlock.blocks.chart1.options.series[1] = {}
                }
                if(!this.configChartForm.series3) {
                    config.blocks.routerBlock.blocks.chart1.options.series[2] = {}
                }
            } else if (this.templateIndex === 2) {
                // config.blocks.routerBlock.blocks.chart1.options.title.text = this.configChartForm.title
                if(!this.configCardForm.card1.show) {
                    delete config.blocks.routerBlock.blocks.componentBlock.blocks.card1
                } else {
                    config.blocks.routerBlock.blocks.componentBlock.blocks.card1.blocks.titleBlock1.options.title = this.configCardForm.card1.title
                }
                if(!this.configCardForm.card2.show) {
                    delete config.blocks.routerBlock.blocks.componentBlock.blocks.card2
                } else {
                    config.blocks.routerBlock.blocks.componentBlock.blocks.card2.blocks.titleBlock2.options.title = this.configCardForm.card2.title
                }
                if(!this.configCardForm.card3.show) {
                    delete config.blocks.routerBlock.blocks.componentBlock.blocks.card3
                } else {
                    config.blocks.routerBlock.blocks.componentBlock.blocks.card3.blocks.titleBlock3.options.title = this.configCardForm.card3.title
                }
                if(!this.configCardForm.card4.show) {
                    delete config.blocks.routerBlock.blocks.componentBlock.blocks.card4
                } else {
                    config.blocks.routerBlock.blocks.componentBlock.blocks.card4.blocks.titleBlock4.options.title = this.configCardForm.card4.title
                }
            }
            
            return config
        },
        onToTemplate() {
            window.open('/market/', '_self')
        },
        onToProduceHTML(e){
            const config = beautify(stringify(this.filterConfig()), { indent_size: 4, space_in_empty_paren: true });
            downloadTemplate(e.currentTarget, this.templateFileName[this.templateIndex], config)
        }
    }
}
</script>
<style lang="scss" scoped>
.demo {
    padding-top: 20px;
    &-step1, &-step2, &-step3 {
        padding: 20px 0;
    }
    &-step1{
        display: flex;
        flex-wrap: wrap;
        .templates-list-item{
            width: 240px;
            margin: 10px;
            border-width: 1px;
            border-style: solid;
            border-color: #f2f2f2;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            z-index: 1;
            &.chose,&:hover{
                box-shadow: 0 0 10px 3px rgba(39, 54, 78, 0.2);
                border-color: transparent;
            }
            &.chose{
                i.el-icon-circle-check{
                    color: #409EFF;
                }
            }
            i.el-icon-circle-check{
                position: absolute;
                z-index: 3;
                cursor: pointer;
                top: 0;
                left: 0;
                padding: 5px;
                font-size: 30px;
                // font-weight: bold;
                color: #fff;
                border-radius: 0 0 10px 0;
            }
            .img{
                height: 128px;
                overflow: hidden;
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                img {
                    width: 100%;
                }
            }
            .tit{
                line-height: 32px;
                height: 32px;
                background-color: #304156;
                color: #999;
                padding:0 10px;
                text-align: right;
                b{
                    color: #fff;
                    float: left;
                }
            }
            &.more{
                .img{
                    font-size: 40px;
                    display: flex;
                    justify-content: center;
                    color: #409EFF;
                }
            }
        }
    }
    &-stpe3{
        border: 1px dashed #eee;
    }
}
</style>
