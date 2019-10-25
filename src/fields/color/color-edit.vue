<template>
    <div class="ams-field-color-edit">
        <el-input
            v-if="field.input"
            v-model="localValue"
            type="text"
            style="width: 95px;vertical-align: middle; margin-right: 5px;"
            :style="{ 'color': localValue }"
            placeholder="#000000"
            v-bind="field.props">
        </el-input>

        <el-color-picker v-model="localValue"
                     style="vertical-align: middle;"
                     :style="field.style"
                     v-on="on"
                     v-bind="field.props" />
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>

<style lang="scss">
.ams-field-color-edit {
    width: 150px;
    vertical-align: middle;
    color: #606266;
    .el-input__inner {
        color: inherit;
    }
}
</style>>
