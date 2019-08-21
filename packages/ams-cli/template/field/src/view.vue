<template>
    <el-color-picker :value="value"
                     :style="field.style"
                     v-bind="field.props" />
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin]
}
</script>
