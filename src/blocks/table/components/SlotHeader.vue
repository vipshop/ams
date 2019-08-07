<template>
    <div class="cell-div">

        <!-- 提示框 -->
        <template v-if="
                    column['slot-header']
                    && column['slot-header'].type === 'tooltip'">
            {{column.label}}
            <el-tooltip class="tooltip" effect="dark" placement="top">
                <i class="el-icon-question slot-header-icon"></i>
                <div slot="content" v-html="column['slot-header'].content"></div>
            </el-tooltip>
        </template>

        <!-- 折叠按钮 -->
        <template
            v-else-if="
                column['slot-header']
                && column['slot-header'].type === 'collapse'
                && column['slot-header'].collapseColumn
                && column['slot-header'].collapseColumn.length">
            {{column.label}}
            <i class="el-icon-remove-outline slot-header-icon" v-if="column.collapseOpen" @click="handleCollapse($event)"></i>
            <i class="el-icon-circle-plus-outline slot-header-icon" v-else @click="handleCollapse($event)"></i>
        </template>

        <!-- 表头lable -->
        <template v-else>
            {{column.label}}
        </template>

    </div>
</template>

<script>
export default {
    props: ['column'],
    data() {
        return {

        };
    },
    computed: { },
    methods: {
        handleCollapse(event) {
            // 触发父组件
            this.$emit('handleCollapse', this.column);

            // 阻止冒泡，因为单元格可能有其他排序或者表格点击事件
            event.cancelBubble = true;
            event.stopPropagation && event.stopPropagation();
        }
    }
};
</script>

<style lang="scss">
.ams-block-table {
    .el-table th .cell-div {
        line-height: 1;
        display: inline-block;
        vertical-align: middle;
    }

    .el-table th .tooltip {
        display: inline-block;
        vertical-align: middle;
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
