<template>
    <span>
        <el-checkbox class="select-all" :indeterminate="indeterminate" v-if="isShowSelectAllCheck" v-model="isSelectAll">全选</el-checkbox>
        <el-checkbox-group v-model="localValue"
                        :style="field.style"
                        v-on="on"
                        v-bind="field.props">
            <el-checkbox :key="item.value"
                        v-for="item in options"
                        v-bind="item"
                        :label="item.value">{{item.label}}</el-checkbox>

        </el-checkbox-group>
    </span>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin]
};
</script>
