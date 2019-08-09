<template>
    <div v-if="ready"
         class="ams-block-list"
         :style="block.style">
        <ams-blocks :blocks="block.slotBlocks.top" />

        <ams-operations :name="name"
                        slot-name="searchs"
                        @keyup.enter.native="handlerSearch"></ams-operations>

        <ams-blocks :blocks="block.slotBlocks.tableTop" />

        <ams-operations :name="name"
                        :context="batchSelected"
                        v-if="batchSelected.length > 0"
                        slot-name="multipleSelect"></ams-operations>

        <el-form :model="data" ref="amsForm">
            <el-table :data="data.list"
                      @sort-change="handleSortChange"
                      @filter-change="handleFilterChange"
                      @selection-change="handleSelectionChange"
                      @select-all="handleSelectAll"
                      v-loading="loading"
                      v-on="on"
                      v-bind="block.props"
                      :height="height"
                      ref="amsTable"
                      highlight-current-row>
                <el-table-column v-if="block.options.multipleSelect"
                                 type="selection"
                                 width="40" />
                <el-table-column v-for="(field, fieldName) in fields"
                                 :label="field.label"
                                 v-if="!field.hidden"
                                 :key="fieldName"
                                 :prop="fieldName"
                                 type=""
                                 :column-key="fieldName"
                                 fit
                                 :min-width="defaultListFieldWidth[field.type] || 'auto'"
                                 :align="field.props['align'] || 'center'"
                                 v-bind="field.props">
                    <template slot-scope="scope">
                        <!--fields-->
                        <component :is="`ams-field-${field.type}-${field.ctx}`"
                                   :field="field"
                                   :value="scope.row[fieldName]"
                                   :name="name"
                                   :path="`list[${scope.$index}].${fieldName}`"
                                   :class="`ams-field ams-field-${field.type}-${field.ctx}`" />
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                                 v-if="block.operationsCounts.operations"
                                 fit
                                 fixed="right"
                                 min-width="140px"
                                 align="center">
                    <template slot-scope="scope">
                        <ams-operations :name="name"
                                        :slot-field-key="`defaultOperations${scope.$index}`"
                                        :context="scope.row"></ams-operations>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-pagination ref="amsPagination"
                       v-if="data.total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="data.page"
                       :page-size.sync="data.pageSize"
                       layout="total, prev, sizes, pager, next, jumper"
                       background
                       align="right"
                       :total="data.total">
        </el-pagination>

        <ams-blocks :blocks="block.blocks" />
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import { defaultListFieldWidth } from '../../ams/configs/field';
import { addEvent, getDomPos, getDomStyle, debounce } from '../../utils/index';

export default {
    mixins: [mixins.blockMixin],
    data() {
        return {
            defaultListFieldWidth,
            filters: {},
            // searchs: {'},
            sortField: null,
            sortOrder: null,
            batchSelected: [],
            height: null
        };
    },
    methods: {
        afterReady() {
            if (this.block.options && this.block.options.tableHeightFit) {
                this.heightFit();

                // 监听滚动事件
                addEvent(window, 'resize', debounce(() => {
                    this.heightFit();
                }, 100));
            } else if (this.block.props && this.block.props.height) {
                this.height = this.block.props.height;
            }
        },
        heightFit() {
            if (this.$refs.amsForm) {
                // 屏幕高度
                let clientH = document.documentElement.clientHeight || document.body.clientHeight;
                // form离body顶部距离
                let domOffsetTop = getDomPos(this.$refs.amsForm.$el).top;

                // pagination组件height+padding+margin
                let pagination = (this.$refs.amsPagination && this.$refs.amsPagination.$el) || null;
                let paginationH = 0;
                if (pagination) {
                    paginationH = pagination.offsetHeight + parseInt(getDomStyle(pagination, 'marginTop'), 10) + parseInt(getDomStyle(pagination, 'marginBottom'), 10);
                }

                this.height = clientH - domOffsetTop - paginationH - 25;
            }
        },
        handlerSearch() {
            // console.log('handlerSearch', this.searchs);
            this.data.page = 1;
            this.emitEvent('list');
        },
        handleSizeChange() {
            console.log('handleSizeChange');
            this.data.page = 1;
            this.emitEvent('list');
        },
        handleCurrentChange(e) {
            console.log('handleCurrentChange');
            this.emitEvent('list');
        },
        handleSortChange({ prop, order }) {
            console.log('handleSortChange', prop, order);
            this.sortField = prop;
            this.sortOrder = order;
            this.data.page = 1;
            this.emitEvent('list');
        },
        handleFilterChange(e) {
            console.log('handleFilterChange', e);
            // 远程筛选
            let remoteFilterChange = false;
            Object.keys(e).forEach(key => {
                console.log(
                    'this.block.filters[key].remote',
                    this.block.filters[key].remote
                );
                if (this.block.filters[key].remote) {
                    remoteFilterChange = true;
                    const filter = e[key].join(',');
                    if (filter) {
                        this.filters[key] = filter;
                    } else {
                        delete this.filters[key];
                    }
                }
            });
            if (remoteFilterChange) {
                this.data.page = 1;
                this.emitEvent('list');
            }
        },
        handleSelectionChange(selection) {
            this.batchSelected = selection;
        },
        handleSelectAll(selection) {
            this.batchSelected = selection;
        }
    }
};
</script>

<style lang="scss">
.ams-block-list {
    .el-pagination {
        margin-top: 20px;
    }
    .el-slider__button-wrapper {
        z-index: 1;
    }
}
</style>
