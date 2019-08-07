<template>
    <el-input v-model="localValue"
              v-on="on"
              :style="field.style"
              v-bind="field.props" />
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>
