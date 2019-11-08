<template>
    <el-link
        :style="field.style"
        :href="href"
        v-bind="field.props">{{ viewValue }}</el-link>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    computed: {
        href() {
            return typeof this.field.props.href === 'function' ? this.field.props.href(this.value, this.field, this.context) : this.field.props.href || this.value;
        }
    },
};
</script>

<style>
.el-form-item .ams-field-link-view{
    line-height: normal;
    vertical-align: inherit;
}
</style>
