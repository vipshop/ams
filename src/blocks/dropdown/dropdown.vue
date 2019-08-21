<template>
    <div v-if="ready"
        class="ams-block-dropdown"
        :style="block.style" >
        <el-dropdown v-bind="block.props" v-on="on">
            <el-button class="el-dropdown-link" v-if="block.props && block.props['button'] && !block.props['split-button']" v-bind="block.props">
                {{ block.options.menu }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <span class="el-dropdown-link" v-else>
                {{ block.options.menu }}
                <i v-if="!(block.props && block.props['split-button'])" class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-if="block.options.menuItems" >
                <el-dropdown-item
                    v-for="(item, index) in block.options.menuItems"
                    :key="index"
                    v-bind="item.props">
                    {{ typeof item.text !== 'undefined' ? item.text : item }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <ams-blocks :blocks="block.blocks" />
        <ams-operations :name="name" />
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>
