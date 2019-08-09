<template>
  <el-tree :data="showOptions"
    :style="field.style"
    v-bind="field.props"
    v-on="on"
  ></el-tree>
</template>
<script>
import mixins from '../../ams/mixins';
export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin],
    computed: {
        showOptions() {
            const localValue = this.localValue || [];
            const childrenName = this.field.props && this.field.props.defaultProps && this.field.props.defaultProps.children || 'children';
            const filterOption = (option, value) => {
                if (!option) {
                    return null;
                }
                if (option.value && value.indexOf(`${option.value}`) >= 0) {
                    return option;
                }
                if (!option[childrenName] || !option[childrenName].length) {
                    return null;
                }
                const newChild = [];
                option[childrenName].forEach(child => {
                    const filterChild = filterOption(child, value);
                    if (filterChild) newChild.push(filterChild);
                });
                if (!newChild.length) {
                    return null;
                }
                option[childrenName] = newChild;
                return option;
            };

            const convertOptions = {
                label: '',
                value: '',
                [childrenName]: JSON.parse(JSON.stringify(this.field.props.options))
            };
            if (this.field.props && this.field.props.options) {
                const result = filterOption(convertOptions, localValue);
                if (result && result.children) return result.children;
                return [];
            }
            return [];
        }
    }
};
</script>