<template>
    <div class="ams-field-color-view">
        <el-input
            v-if="field.input"
            :value="value"
            type="text"
            style="width: 95px;vertical-align: middle; margin-right: 5px;"
            :style="{ 'color': value }"
            disabled
            v-bind="field.props">
        </el-input>

        <el-color-picker :value="value"
                     style="vertical-align: middle;"
                     :style="field.style"
                     v-bind="field.props" disabled />
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-color-view{
    width: 150px;
    vertical-align: middle;
    color: #606266;
    .el-input__inner {
        color: inherit;
    }
    .el-input.is-disabled .el-input__inner {
        color: inherit;
    }
    .el-color-picker__mask, .el-color-picker__icon{
        display: none;
    }
}
</style>
