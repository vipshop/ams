<template>
    <div class="ams-material">
        <aside class="sidebar ams-sidebar">
            <ul class="sidebar-links">
                <li><a href="/market/"
                       class="active sidebar-link">模板物料</a></li>
                <li><a href="/market/block.html"
                       class="sidebar-link">区块物料</a></li>
                <li><a href="/market/field.html"
                       class="sidebar-link">字段物料</a></li>
            </ul>
        </aside>
        <ams-block v-if="init"
        class="ams-material-main"
                   name="market-template" />
    </div>
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import block from './block'
import cardBlock from '../packages/template-card'
import templateResource from '../resources/resource-template'

ams.registerBlock(cardBlock);
ams.resource('resource-template', templateResource);

export default {
    data() {
        return {
            init: false
        }
    },
    mounted() {
        // 如果已经注册过则不再注册
        if (ams && ams.blocks && ams.blocks['market-template']) {
            this.init = true;
            return;
        }

        ams.block('market-template', block)

        this.init = true
    }
}
</script>

<style>
.ams-material-main .CodeMirror{
    height: 550px;
}
</style>
