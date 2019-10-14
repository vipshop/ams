<template>

    <el-tooltip :disabled="!tooltip"
                v-bind="tooltip">
        <el-badge v-bind="badge">
            <el-button @click.stop="emit"
                :style="operation.style"
                v-bind="operation.props"><template v-if="operation.label">{{operation.label}}</template></el-button>
        </el-badge>
    </el-tooltip>

</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin]
};
</script>


<style lang="scss">
.el-badge__content.is-fixed{
    z-index: 3;
}
</style>