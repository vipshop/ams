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
            const fields = this.$block.fields;
            if (!this.operation.field && fields[this.operationKey]) {
                return fields[this.operationKey];
            }
            // 使用operation.field的字段配置
            if (typeof this.operation.field === 'string') {
                return fields[this.operation.field];
            }
            // 类型
            // customText: {
            //     slot: 'searchs',
            //     type: 'field',
            //     label: '自定义标签',
            //     field: {
            //         type: 'select',
            //         props: {
            //             options: {
            //                 1: 'a',
            //                 2: 'b',
            //                 3: 'c'
            //             }
            //         }
            //     }
            // }
            if (typeof this.operation.field === 'object') {
                // 获取field默认配置
                this.$block.initDefaultField(this.operation.field);
                return {
                    name: this.operationKey,
                    ...this.operation.field
                };
            }
            // 类型
            // customText: {
            //     slot: 'searchs',
            //     type: 'field',
            //     label: '自定义标签',
            //     props: {
            //         options: {
            //             1: 'a',
            //             2: 'b',
            //             3: 'c'
            //         }
            //     }
            // }
            this.$block.initDefaultField(this.operation);
            return {
                name: this.operationKey,
                ...this.operation
            };
        }
    }
};
</script>

<style lang="scss">
.ams-operation-field {
    display: inline-block;
}
</style>
