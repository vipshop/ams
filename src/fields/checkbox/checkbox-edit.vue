<template>
    <el-checkbox-group v-model="localValue"
                       :style="field.style"
                       v-on="on"
                       v-bind="field.props">
        <el-checkbox :key="item.value"
                     v-for="item in options"
                     v-bind="item"
                     :label="item.value">{{item.label}}</el-checkbox>
    </el-checkbox-group>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin]
};
</script>
