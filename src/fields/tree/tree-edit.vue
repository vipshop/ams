<template>
  <el-tree
    ref="tree"
    :data="field.props && field.props.options || []"
    :default-checked-keys="localValue"
    :show-checkbox="showCheckBox"
    v-bind="field.props"
    v-on="on"
    @check-change="handleCheckChange">
  </el-tree>
</template>
<script>
import mixins from '../../ams/mixins';
export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin],
    computed: {
        showCheckBox() {
            if (this.field.props && typeof this.field.props['show-checkbox'] !== 'undefined') {
                return this.field.props['show-checkbox'];
            }
            return true;
        }
    },
    watch: {
        data(val) {
            this.localValue = this.$refs.tree.getCheckedKeys();
        }
    },
    methods: {
        handleCheckChange() {
            this.localValue = this.$refs.tree.getCheckedKeys();
        }
    }
};
</script>