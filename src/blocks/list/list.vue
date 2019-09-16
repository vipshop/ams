<template>
    <div v-if="ready"
         class="ams-block-list"
         :style="block.style">
        <ams-blocks :blocks="block.slotBlocks.top" />
        <!-- 搜索operations插槽 -->
        <ams-operations :name="name"
                        slot-name="searchs"
                        class="left-operations"
                        @keyup.enter.native="handlerSearch"></ams-operations>
        <!-- 顶部右边operations插槽 -->
        <ams-operations :name="name"
                        slot-name="rightTop"
                        class="right-operations"
                        @keyup.enter.native="handlerSearch"></ams-operations>

        <ams-blocks :blocks="block.slotBlocks.tableTop" />
        <!-- 多选时的operations -->
        <ams-operations :name="name"
                        :context="batchSelected"
                        v-if="batchSelected.length > 0"
                        slot-name="multipleSelect"></ams-operations>

        <el-form :model="data" ref="amsForm">
            <el-table :data="listData"
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
                <el-table-column v-if="block.props.type === 'index'"
                                 type="index"
                                 align="center" />
                <el-table-column v-for="(field, fieldName) in fields"
                                 :label="field.label"
                                 v-if="!field.hidden"
                                 :key="fieldName"
                                 :prop="fieldName"
                                 type=""
                                 :column-key="fieldName"
                                 fit
                                 :min-width="defaultListFieldWidth[field.type] || '90px'"
                                 :align="field.props['align'] || 'center'"
                                 v-bind="field.props">
                    <template slot-scope="scope">
                        <!--fields-->
                        <field :field="getField(field, scope.row)" :value="scope.row[fieldName]" :name="name" :path="`list[${scope.$index}].${fieldName}`"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作"
                                 v-if="block.operationsCounts.operations"
                                 fixed="right"
                                 min-width="140px"
                                 :width="operationsWidth"
                                 align="center">
                    <template slot-scope="scope">
                        <ams-operations :name="name"
                                        :slot-field-key="`defaultOperations${scope.$index}`"
                                        :context="scope.row"></ams-operations>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>

        <div class="clearfix bottom-operations">
            <!-- 底部左边operations插槽 -->
            <ams-operations :name="name"
                            slot-name="leftBottom"
                            class="left-operations"
                            @keyup.enter.native="handlerSearch"></ams-operations>

            <!-- 底部右边operations插槽 -->
            <ams-operations :name="name"
                            slot-name="rightBottom"
                            class="right-operations"
                            @keyup.enter.native="handlerSearch"></ams-operations>
        </div>

        <!-- 分页 -->
        <el-pagination ref="amsPagination"
                       v-if="pageTotal"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="data.page"
                       :page-size.sync="data.pageSize"
                       :page-sizes="data.pageSizes"
                       layout="total, prev, sizes, pager, next, jumper"
                       background
                       align="right"
                       :total="pageTotal">
        </el-pagination>

        <ams-blocks :blocks="block.blocks" />
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import { defaultListFieldWidth } from '../../ams/configs/field';
import { addEvent, getDomPos, getDomStyle, debounce } from '../../utils/index';
import field from '../../components/field';

export default {
    components: {
        field
    },
    mixins: [mixins.blockMixin, mixins.getField],
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
    computed: {
        isSimulatePagination() {
            return this.block.props && this.block.props.pagination === 'simulate';
        },
        pageTotal() {
            // 列表数据总数
            if (this.isSimulatePagination) {
                return this.data.list && this.data.list.length;
            }
            return this.data.total;
        },
        listData() {
            // 列表数据
            if (this.isSimulatePagination) {
                return this.data.list && this.data.list.slice((this.data.page - 1) * this.data.pageSize, this.data.page * this.data.pageSize);
            }
            return this.data.list;
        },
        operationsWidth() {
            return this.block.options && this.block.options.operationsWidth;
        }
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
            if (this.isSimulatePagination) {
                return;
            }
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
    .left-operations{
        float: left;
    }
    .right-operations{
        float: right;
    }
    .bottom-operations{
        .ams-operations{
            margin-top: 20px;
        }
    }
}
</style>
