<template>
    <el-tooltip :disabled="!tooltip"
                v-bind="tooltip">
        <el-button @click.stop="filter"
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
        filter() {
            this.$parent &&
                this.$parent.$parent &&
                this.$parent.$parent.showHeaderSelectedDialog &&
                this.$parent.$parent.showHeaderSelectedDialog();
        }
    }
};
</script>

