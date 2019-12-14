<template>
    <div class="ams-block-drawer" v-if="ready">
        <el-drawer :title="data.title"
                   :visible.sync="data.visible"
                   :style="block.style"
                   v-on="on"
                   v-bind="block.props">
            <div class="ams-block-drawer-body">
                <ams-blocks v-loading="loading" :blocks="block.blocks"
                            v-if="data.visible" />
            </div>
            <div class="ams-block-drawer-footer">
                <ams-operations :name="name"></ams-operations>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>

<style lang="scss">
.ams-block-drawer-body {
    padding: 10px 20px;
    word-break: break-all;
}
.ams-block-drawer-footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
}
.el-drawer__body{
    overflow-y: scroll;
}
</style>

