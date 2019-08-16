<template>
    <div class="ams-material">
        <aside class="sidebar ams-sidebar">
            <ul class="sidebar-links">
                <li><a href="/ams/market/"
                       class="sidebar-link">模板物料</a></li>
                <li><a href="/ams/market/block.html"
                       :class="{active:type==='block', 'sidebar-link':true}">区块物料</a></li>
                <li><a href="/ams/market/field.html"
                       :class="{active:type==='field', 'sidebar-link':true}">字段物料</a></li>
            </ul>
        </aside>
        <ams-block v-if="init"
                   class="ams-material-main"
                   name="market-detail" />
    </div>
</template>

<script>
import ams from '@ams-team/ams'
import '../../entry'
import block from './block'
// import cardBlock from '../packages/material-card'
import materialResource from '../resources/resource-material'

// ams.registerBlock(cardBlock);

export default {
    data() {
        return {
            init: false,
            type: ''
        }
    },
    mounted() {
        // 如果已经注册过则不再注册
        ams.resource('resource-material', materialResource);
        this.type = ams.utils.getQueryString('type');
        // console.log(data);
        ams.block('market-detail', block);

        this.init = true;
    }
}
</script>
