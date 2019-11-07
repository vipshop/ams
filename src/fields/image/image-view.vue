<template>
    <el-image
        v-if="viewValue"
        :src="viewValue"
        :style="field.style"
        :preview-src-list="!isHeadimage ? srcList : []"
        :fit="field.props && field.props.fit"
        :class="isHeadimage ? 'ams-field-headimage' : ''">
    </el-image>
    <i class="el-icon-picture"
       v-else></i>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    computed: {
        srcList() {
            return (this.field.props && this.field.props['preview-src-list']) || [this.viewValue];
        },
        isHeadimage() {
            return this.field.props && this.field.props.headimage;
        }
    },
};
</script>

<style lang="scss">
.ams-field-image-view {
    font-size: 50px;
    display: block;
    width: 100px;
    height: 100px;
    &.ams-field-headimage {
        border-radius: 50%;
    }
}
</style>

