<template>
    <a :href="value"
       :style="field.style"
       download
       v-if="value"><i class="el-icon-document"></i>{{viewValue}}</a>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-file-view, .ams-field-originfile-view{
    .el-icon-document {
        margin-right: 2px;
    }
    color: #606266;
    &:hover {
        color: #409eff;
    }
}
</style>

