<template>
    <div v-if="ready" class="ams-block-alert" :style="block.style">
        <el-alert v-bind="props" v-on="on"></el-alert>
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        props() {
            if (this.block && this.block.props) {
                return this.block.props;
            }
            return {};
        }
    }
};
</script>
<style>
.ams-block-alert {
    margin: 8px 0;
}
</style>

