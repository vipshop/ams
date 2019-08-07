<template>
    <el-transfer v-model="localValue"
                 :data="field.props.options"
                 v-on="on"
                 :style="field.style"
                 v-bind="field.props">
    </el-transfer>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>
