<template>
    <el-color-picker :value="value"
                     :style="field.style"
                     v-bind="field.props" disabled/>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-color-view{
    .el-color-picker__mask, .el-color-picker__icon{
        display: none;
    }
}
</style>
