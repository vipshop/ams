<template>
    <span class="ams-select-edit">
        <el-select v-model="localValue"
                ref="select"
                :loading="loading"
                :style="field.style"
                v-on="on"
                v-bind="field.props">
            <el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    v-bind="item"
                    :value="item.value">

                    <!-- 使用slot定制自定义html -->
                    <template v-if="item.html">
                        <div v-html="item.html"></div>
                    </template>

            </el-option>
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

