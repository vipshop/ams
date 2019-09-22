<template>
    <div v-if="ready"
         :style="block.style"
         class="ams-block-tooltips">
        <el-popover v-on="on" v-bind="block.props">
            <span v-if="slot.content" v-html="slot.content"></span>
            <ams-blocks :blocks="block.slotBlocks.content" />

            <template slot="reference">
                <span v-if="slot.reference" v-html="slot.reference"></span>
                <ams-blocks :blocks="block.slotBlocks.reference" />
            </template>
        </el-popover>
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        slot() {
            return this.block.slots || {};
        }
    }
};
</script>