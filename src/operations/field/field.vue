<template>
    <div class="ams-operation-field"
         :style="operation.style"
         v-bind="operation.props">
        <component :is="`ams-field-${field.type}-edit`"
                   :field="field"
                   :value="$block.data[path][operationKey]"
                   :name="name"
                   :path="`${path}.${operationKey}`"
                   :class="`ams-field ams-field-${field.type}-edit`" />
    </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin],
    inject: ['$block'],
    computed: {
        field() {
            // 使用operationKey作用默认field名
            if (!this.operation.field) {
                return this.$block.fields[this.operationKey];
            }
            if (typeof this.operation.field === 'string') {
                return this.$block.fields[this.operation.field];
            } else {
                // 获取field默认配置
                this.$block.initDefaultField(this.operation.field);
                return this.operation.field;
            }
        }
    }
};
</script>

<style lang="scss">
.ams-operation-field {
    display: inline-block;
}
</style>
