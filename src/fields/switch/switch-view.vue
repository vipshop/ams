<template>
    <el-switch :value="value"
               disabled
               :style="field.style"
               v-bind="field.props" />
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>
