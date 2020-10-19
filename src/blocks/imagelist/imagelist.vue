<template>
    <div v-if="ready"
         class="ams-block-imagelist"
         :style="block.style"
         v-loading="loading"
         v-on="on"
         v-bind="block.props">
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
        <div class="clearfix"></div>

        <ams-blocks :blocks="block.slotBlocks.tableTop" />

        <!-- 多选时的operations -->
        <el-checkbox v-if="showBatchOperations" :indeterminate="indeterminate" v-model="isSelectAll" class="select-all-operations">全选</el-checkbox>
        <ams-operations :name="name"
                        :context="batchSelected"
                        class="clearfix"
                        slot-name="multipleSelect"></ams-operations>
        <div v-if="listData && listData.length" class="ams-block-imagelist-box clearfix">
            <template v-for="(item, index) in listData">
                <template v-if="block.options && block.options.categorys">
                    <template v-for="(category, j) in block.options.categorys">
                        <div class="categorys-title" v-if="index === category.index" :key="`${index}-${j}`" v-html="category.title"></div>
                    </template>
                </template>
                <listitem
                    :image="item"
                    :block="block"
                    :name="name"
                    :key="item.id"
                    :index="index"
                    :batchSelected="batchSelected"
                    :showCheckbox="showBatchOperations"
                    v-on:clickImageItem="clickImageItem($event, item, index)"
                    v-on:selectionChange="handleSelectionChange(item)"/>
            </template>
        </div>
        <div class="el-table__empty-block" v-else>
            <span class="el-table__empty-text">{{block.props['empty-text']}}</span>
        </div>

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
import ams from '../../ams/index';
import mixins from '../../ams/mixins';
// import { addEvent, getDomPos, getDomStyle, debounce } from '../../utils/index';
import listitem from './listitem';
import { deepExtend } from '../../utils/index';

export default {
    components: {
        // field,
        listitem
    },
    mixins: [mixins.blockMixin],
    data() {
        return {
            // defaultListFieldWidth,
            filters: {},
            // searchs: {'},
            sortField: null,
            sortOrder: null,
            batchSelected: [],
            height: null,
            isIndeterminate: false,
            showBatchOperations: false // 是否显示批量操作按钮
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
        },
        indeterminate() {
            if (this.batchSelected.length > 0 && this.batchSelected.length < this.listData.length) {
                return true;
            }
            return false;
        },
        isSelectAll: {
            set(val) {
                if (val) {
                    this.batchSelected = deepExtend([], this.listData);
                } else {
                    this.batchSelected = [];
                }
            },
            get() {
                return this.batchSelected.length === this.listData.length;
            }
        }
    },
    methods: {
        // afterReady() {
        //     this.block.data.showBatchOperations = false; // 是否显示批量操作按钮
        // },
        clickImageItem(e, item, index) {
            if (e && e.target && (e.target.className === 'el-checkbox__original' || e.target.className === 'el-checkbox__inner')) {
                return;
            }
            // console.log(e);
            // 点击图片时触发
            ams.$prevReturn = item;
            ams.$prevReturn['__index'] = index;
            this.emitEvent('clickImageItem');
        },
        handlerSearch() {
            // console.log('handlerSearch', this.searchs);
            this.data.page = 1;
            this.batchSelected = [];
            this.emitEvent('list');
        },
        handleSizeChange() {
            console.log('handleSizeChange');
            this.data.page = 1;
            this.batchSelected = [];
            this.emitEvent('list');
        },
        handleCurrentChange(e) {
            console.log('handleCurrentChange');
            this.batchSelected = [];
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
            this.batchSelected = [];
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
                this.batchSelected = [];
                this.emitEvent('list');
            }
        },
        handleSelectionChange(selection) {
            if (selection) {
                // 如果已经存在index字段
                const ishas = this.batchSelected.some((element, i, array) => {
                    if (JSON.stringify(element) === JSON.stringify(selection)) {
                        array.splice(i, 1);
                        return true;
                    }
                    return false;
                });
                if (!ishas) {
                    this.batchSelected.push(selection);
                }
            }
        }
    }
};
</script>

<style lang="scss">
.ams-block-imagelist {
    z-index: 1;
    .select-all-operations{
        float: left;
        padding-right: 10px;
        height: 40px;
        line-height: 40px;
    }
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
.ams-block-imagelist-box{
    .categorys-title{
        clear: both;
        font-weight: bold;
        padding: 20px 12px 0;
    }
    // display: flex;
    // flex-wrap: wrap;
    // // align-content: flex-start;
    // justify-content: space-between;
}
</style>
