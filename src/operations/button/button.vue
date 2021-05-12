<template>

    <el-tooltip :disabled="!tooltip"
                v-bind="tooltip">
        <el-badge v-bind="badge">
            <el-button @click.stop="beforeEmit"
                :style="operation.style"
                v-bind="operation.props"><template v-if="operation.label">{{operation.label}}</template></el-button>
        </el-badge>
    </el-tooltip>

</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin],
    methods: {
        /**
         * 点击删除的时候，显示弹窗进行二次确认
         * delete: {
         *  type: 'button',
         *  label: '删除',
         *  confirmText: '确认删除吗？'
         * }
         */
        beforeEmit() {
            const confirmText = this.operation.confirmText;
            if (confirmText) {
                this.$confirm(confirmText, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.emit();
                });
                return;
            }
            this.emit();
        }
    }
};
</script>


<style lang="scss">
.el-badge__content.is-fixed{
    z-index: 3;
}
</style>