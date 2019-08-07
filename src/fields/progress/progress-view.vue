<template>
    <el-progress :percentage="value"
                 :style="field.style"
                 v-bind="field.props"></el-progress>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-progress-view {
    margin: 11px 0;
}
</style>
