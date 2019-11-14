<template>
    <el-card v-if="ready"
             :class="`ams-block-card ${ block.slotBlocks.header ? 'ams-block-card-slot-header' : ''}`"
             v-on="on"
             v-loading="loading"
             v-bind="block.props"
             :style="block.style">
        <template slot="header" v-if="block.slotBlocks.header || block.options.headerTitle">
            <ams-blocks v-if="block.slotBlocks.header"
                    :blocks="block.slotBlocks.header"
                    ></ams-blocks>
            <span v-else-if="block.options.headerTitle"
                >{{block.options.headerTitle}}</span>
            <ams-operations class="ams-card-operations"
                            :name="name"
                            :style="block.options.style" />
        </template>

        <ams-blocks :blocks="block.blocks"></ams-blocks>
    </el-card>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>

<style lang="scss">
.ams-block-card {
    .el-card__header{
        position: relative;
        z-index: 1;
    }
    .ams-card-operations {
        position: absolute;
        z-index: 2;
        top: 50%;
        right: 10px;
        transform: translateY(-41%);
    }
    &.ams-block-card-slot-header{ //如果是slotBlocks的header，把header的默认样式去掉，留给slotBlocks控制header样式
        .el-card__header{
            padding: 0;
            border-bottom: 0;
        }
    }
}
</style>

