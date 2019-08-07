<template>
    <el-input-number v-model="localValue"
                     v-on="on"
                     :style="field.style"
                     v-bind="field.props"></el-input-number>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>
