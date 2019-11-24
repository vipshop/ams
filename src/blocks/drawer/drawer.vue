<template>
    <div class="ams-block-drawer" v-if="ready">
        <el-drawer :title="data.title"
                   :visible.sync="data.visible"
                   :style="block.style"
                   v-on="on"
                   v-bind="block.props">
            <ams-blocks v-loading="loading" :blocks="block.blocks"
                            v-if="data.visible" />
            <div slot="footer">
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

