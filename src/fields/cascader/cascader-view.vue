<template>
    <el-cascader :value="localValue"
                 :style="field.style"
                 v-bind="field.props"
                 disabled></el-cascader>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>
<style>
.el-cascader.is-disabled .el-cascader__label span {
    color: inherit
}
</style>
