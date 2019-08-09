<template>
    <el-date-picker v-model="localValue"
                    :style="field.style"
                    v-on="on"
                    v-bind="field.props">
    </el-date-picker>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin]
};
</script>
