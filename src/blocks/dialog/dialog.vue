<template>
    <div class="ams-block-dialog" v-if="ready">
        <el-dialog :title="data.title"
                   :visible.sync="data.visible"
                   :style="block.style"
                   v-on="on"
                   v-bind="block.props">
                   <template v-if="data.visible">
                        <vnode v-loading="loading" :render="block.render" v-if="block.render" />
                        <ams-blocks v-loading="loading" :blocks="block.blocks" v-else />
                   </template>


            <div slot="footer">
                <ams-operations :name="name"></ams-operations>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin, mixins.vnodeMixin]
};
</script>

