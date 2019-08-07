<template>
    <el-slider :value="value"
               disabled
               :style="field.style"
               v-bind="field.props"></el-slider>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

