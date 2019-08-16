<template>
    <el-card shadow="hover" class="demo demo-card">
        <ams-block v-if="init" :name="blockName" class="demo-card-preview"/>
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
import demoMixins from '../../demo/demo-mixin'
import block from './block'
import stringify from '@ams/json-stringify'
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
div.demo:nth-last-of-type(1) {
    z-index: 1;
}
div.demo:nth-last-of-type(2) {
    z-index: 2;
}
.ams-block-router .sidebar-container {
    position: absolute !important;
}
a { color: #3eaf7c; }
.v-modal {
    display: none;
}
</style>
