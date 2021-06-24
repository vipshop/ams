<template>
    <span class="ams-select-edit">
        <el-select v-model="localValue"
                ref="select"
                :loading="loading"
                :style="field.style"
                v-on="on"
                v-bind="field.props">
            <template v-for="option in options">
                <el-option-group
                v-if="option.options"
                :label="option.label">
                <el-option
                    v-for="item in option.options"
                    v-bind="item"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">

                    <!-- 使用slot定制自定义html -->
                    <template v-if="item.html">
                        <div v-html="item.html"></div>
                    </template>
                </el-option>

                </el-option-group>

                <el-option
                    v-else
                    :label="option.label"
                    v-bind="option"
                    :value="option.value">

                    <!-- 使用slot定制自定义html -->
                    <template v-if="option.html">
                        <div v-html="option.html"></div>
                    </template>

                </el-option>
            </template>
        </el-select>
        <el-checkbox class="select-all" v-if="isShowSelectAllCheck" v-model="isSelectAll">全选</el-checkbox>
    </span>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin]
};
</script>

<style lang="scss" scoped>
.ams-select-edit {
    .select-all {
        display: inline;
    }
}
</style>

