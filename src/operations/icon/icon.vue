<template>
    <el-tooltip effect="light"
                :content="operation.label"
                placement="bottom"
                :disabled="!operation.label">
        <i @click.stop="emit"
           :class="`icon ${operation.icon}`"
           :style="operation.style"
           v-bind="operation.props"></i>
    </el-tooltip>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin]
};
</script>
<style lang="scss" scoped>
.icon {
    cursor: pointer;
}
</style>
