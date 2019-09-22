<template>
    <el-tooltip :disabled="!tooltip"
                v-bind="tooltip">
        <el-button @click.stop="reset"
               :style="operation.style"
               v-bind="operation.props"><template v-if="operation.label">{{operation.label}}</template></el-button>
    </el-tooltip>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin],
    methods: {
        reset() {
            this.$parent.getDefaultValue();
            this.emit();
        }
    }
};
</script>

