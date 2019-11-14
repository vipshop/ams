<template>
    <el-card shadow="hover" class="demo demo-card demo-spa">
        <ams-block v-if="init" :name="blockName" class="demo-card-preview"/>
        <div :class="`demo-card-config ${showConfig ? 'open': ''}`">
            <highlight-code lang="javascript">
                {{ configCode }}
            </highlight-code>
        </div>
        <div class="demo-card-config-btn" @click="toggleDemoCofig">
            <i :class="`el-icon-caret-${showConfig ? 'top': 'bottom'}`"></i>
             {{ showConfig ? '隐藏' : '显示'}}配置
            <el-link v-if="onlineDemo" :href="onlineDemo" target="_blank" type="success">在线运行</el-link>
        </div>
    </el-card>
</template>

<script>
import demoMixins from '../../demo/demo-mixin'
import block from './block'
import stringify from '@ams-team/json-stringify'
import beautify from 'js-beautify'

export default {
    mixins: [demoMixins],
    mounted(){
        ams.resource('demoResource', block.demoResource)
        ams.block(`${this.blockName}`, block[this.blockName])

        const stringConfig = stringify(block[this.blockName])
        this.configCode = beautify(stringConfig, { indent_size: 2, space_in_empty_paren: true })
        
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks[this.blockName]) {
            this.init = true;
            return;
        }

        ams.block(`${this.blockName}`, block[this.blockName])

        this.init = true
    }
}
</script>
<style>
div.demo-spa:nth-of-type(1) {
    z-index: 1;
}
div.demo-spa:nth-of-type(2) {
    z-index: 2;
}
div.demo-spa:nth-of-type(3) {
    z-index: 3;
}
div.demo-spa:nth-of-type(4) {
    z-index: 6;
}
div.demo-spa:nth-of-type(5) {
    z-index: 4;
}
.ams-block-router .sidebar-container {
    position: absolute !important;
}
.v-modal {
    display: none;
}
</style>
