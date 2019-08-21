<template>
    <el-color-picker v-model="localValue"
                     :style="field.style"
                     v-on="on"
                     v-bind="field.props" />
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin]
}
</script>
