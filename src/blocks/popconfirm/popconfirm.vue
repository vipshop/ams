<template>
    <div v-if="ready"
         :style="block.style"
         class="ams-block-popconfirm">
        <el-popconfirm v-on="on" v-bind="block.props" :title="slot.title || slot.content">
            <el-button slot="reference" v-if="slot.reference && typeof slot.reference === 'string'">{{ slot.reference }}</el-button>
        </el-popconfirm>
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
