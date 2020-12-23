<template>
    <div v-if="ready"
         class="ams-block-table"
         :style="block.style">
        <ams-blocks :blocks="block.slotBlocks.top" />

        <ams-operations :name="name"
                        slot-name="searchs"></ams-operations>

        <ams-blocks :blocks="block.slotBlocks.tableTop" />

        <el-form :model="data">
            <el-table :border="isBorder"
                      :data="tableList"
                      @sort-change="handleSortChange"
                      @filter-change="handleFilterChange"
                      :span-method="handleSpanMethod"
                      v-on="on"
                      v-bind="block.props"
                      :height="height"
                      v-loading="loading"
                      highlight-current-row>

                <!-- 展开行表头 -->
                <el-table-column v-if="expandRow && expandRow.valueKey" width="50" >
                    <template slot-scope="scope">
                        <div v-if="scope.row[expandRow.valueKey]"
                            @click="handleRowClick(scope.row, scope.$index)">
                            <i class="slot-header-icon el-icon-caret-bottom" v-if="scope.row.open"></i>
                            <i class="slot-header-icon el-icon-caret-right" v-else></i>
                        </div>
                    </template>
                </el-table-column>

                <!-- 含有多级表头配置 -->
                <template v-if="tableColumn">
                    <el-table-column v-if="block.props.type === 'index'"
                                     type="index"
                                     align="center" />
                    <el-table-column v-for="(column, index) in tableColumn"
                                    v-if="!column.hidden"
                                    :key="column.name || index"
                                    :prop="column.name"
                                    :label="column.label"
                                    :width="column.width"
                                    :column-key="column.name"
                                    v-bind="column.props"
                                    fit
                                    align="center">

                        <!-- 自定义表头  S-->
                        <template slot="header">
                            <SlotHeader :column="column" @handleCollapse="handleColumnCollapse" />
                        </template>
                        <!-- 自定义表头  E-->

                        <!-- 表格内容 S-->
                        <template slot-scope="scope" v-if="column.name && fields[column.name]">
                            <component :is="`ams-field-${column.type}-${column.ctx}`"
                                        :field="fields[column.name]"
                                        :value="scope.row[column.name]"
                                        :name="name"
                                        :path="`list[${scope.$index}].${column.name}`"
                                        :context="scope.row"
                                        :class="`ams-field ams-field-${column.type}-${column.ctx}`">
                            </component>
                        </template>
                        <!-- 表格内容 E-->

                        <!-- 二级表头循环，因为element-ui，利用组件循环多级表头会导致顺序错乱，目前这样 -->
                        <template v-if="column.children && column.children.length > 0">

                            <el-table-column v-for="(item, itemIndex) in column.children"
                                        v-if="!item.hidden"
                                        :key="item.name || itemIndex"
                                        :prop="item.name"
                                        :label="item.label"
                                        :width="item.width"
                                        :column-key="item.name"
                                        v-bind="item.props"
                                        fit
                                        align="center">

                                <!-- 自定义表头  S-->
                                <template slot="header">
                                    <SlotHeader :column="item" @handleCollapse="handleColumnCollapse" />
                                </template>

                                <!-- 表格内容 S-->
                                <template slot-scope="scope" v-if="item.name && fields[item.name]">

                                    <component :is="`ams-field-${item.type}-${item.ctx}`"
                                                :field="fields[item.name]"
                                                :value="scope.row[item.name]"
                                                :name="name"
                                                :path="`list[${scope.$index}].${item.name}`"
                                                :context="scope.row"
                                                :class="`ams-field ams-field-${item.type}-${item.ctx}`">
                                    </component>

                                </template>

                            </el-table-column>
                        </template>

                    </el-table-column>
                </template>

                <el-table-column label="操作"
                                 v-if="block.operationsCounts.operations"
                                 fit
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

        <el-pagination v-if="data.total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="data.page"
                       :page-size.sync="data.pageSize"
                       :layout="data.layout || 'prev, sizes, pager, next, jumper'"
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
import SlotHeader from './components/SlotHeader.vue';
import { addEvent, debounce, deepExtend } from '../../utils';

export default {
    components: {
        SlotHeader
    },
    mixins: [mixins.blockMixin],
    data() {
        return {
            defaultListFieldWidth,
            filters: {},
            searchs: {},
            options: {},
            sortField: null,
            sortOrder: null,
            height: null,

            loading: false,
            tableList: [],          // data.list数据处理
            collapseColumn: {},      // 可折叠行收集
            spanMergeData: {
                // id: {
                //     spanArr: [],    //用于存放每一行的合并数
                //     pos: 0          // spanArr 的索引
                // }
            }
        };
    },
    computed: {
        isBorder() {
            const props = this.block.props;
            if (props && typeof props.border !== 'undefined') {
                return props.border;
            }
            return true;
        },
        tableColumn() {
            // option配置有多级表头
            if (this.block.options && this.block.options['table-column'] && this.block.options['table-column'].length) {

                return this.handleTableColumn(this.block.options['table-column']);
            } else {

                return this.handleTableColumn(
                    Object.keys(this.fields).map(val => this.fields[val])
                );
            }
        },
        expandRow() {
            if (this.block.options && this.block.options['expand-row']) {
                return this.block.options['expand-row'];
            } else {
                return false;
            }
        },
        operationsWidth() {
            return this.block.options && this.block.options.operationsWidth;
        }
    },
    watch: {
        'data.list'(val, oldVal) {
            // 复制list数据并打上标记, 并合并相同行
            this.tableList = this.treeTableXcode(JSON.parse(JSON.stringify(this.data.list)));

            // 重新计算spanMergeData
            this.handleSpanMergeData();
        }
    },
    methods: {
        afterReady() {
            // 屏幕自适应
            if (this.block.options && this.block.options.tableHeightFit) {
                this.heightFit();

                // 监听滚动事件
                this.events.push(addEvent(window, 'resize', debounce(() => {
                    this.heightFit();
                }, 100)));
            } else if (this.block.props && this.block.props.height) {
                this.height = this.block.props.height;
            }
        },
        // 行展开或展开子表
        async handleRowClick(rowItem, rowIndex) {

            if (rowItem[this.expandRow.valueKey] && rowItem[this.expandRow.valueKey].length > 0) {
                // 数据存储在valueKey 字段里面直接展示
                if (rowItem.open) {
                    this.rowCollapse(rowItem, rowIndex);
                } else {
                    this.rowExpand(rowItem, rowIndex);
                }
            } else {
                // 动态请求
                const remoteConfig = this.expandRow.remoteConfig;

                if (!remoteConfig || !remoteConfig.action) {
                    return console.warn('no remote action');
                }

                const params = {
                    url: remoteConfig.action,
                    method: 'get'
                };

                if (remoteConfig.queryName) {
                    params.params = {};
                    params.params[remoteConfig.queryName] = rowItem[remoteConfig.queryValue];
                }

                this.loading = true;
                const ams = this.$ams;
                const res = await ams.request(params);
                const successCode = this.getConfig('resource.api.successCode');

                if (
                    res.data.code === successCode &&
                    res.data.data &&
                    res.data.data.list
                ) {
                    let list = this.treeTableXcode(res.data.data.list, `${rowItem.xCode}-`);
                    rowItem[this.expandRow.valueKey] = list || {};

                    this.rowExpand(rowItem, rowIndex);
                }
            }

        },
        // 处理多级表头数据
        handleTableColumn(tableColumn) {
            let newColumn = [];
            let collapseName = [];

            newColumn = tableColumn.map((val, idx, arr) => {
                // 默认表头{}
                let defaultColumn = {
                    ctx: 'view',
                    default: '',
                    hidden: false,
                    label: '',
                    name: '',
                    props: {},
                    children: [],
                    type: 'text'
                };

                // 1、如果表头含有fiedls则合并fields到defaultColumn
                if (this.fields[val.name]) {
                    deepExtend(defaultColumn, this.fields[val.name]);
                }

                // 2、合并option中数据到defaultColumn
                deepExtend(defaultColumn, val);

                // 3、收集记录option中配置可折叠的column
                if (defaultColumn['slot-header'] && defaultColumn['slot-header'].type === 'collapse') {
                    if (this.collapseColumn[defaultColumn.name]) {
                        // 当this.collapseColumn已记录，则判断是否为折叠
                        if (this.collapseColumn[defaultColumn.name].collapseOpen === false) {
                            collapseName = collapseName.concat(defaultColumn['slot-header'].collapseColumn);
                            defaultColumn.collapseOpen = false;
                        } else {
                            defaultColumn.collapseOpen = true;
                        }
                    } else {
                        // 当this.collapseColumn未记录，则初始化为折叠，并记录
                        this.collapseColumn[defaultColumn.name] = {
                            ...defaultColumn['slot-header'],
                            collapseOpen: false
                        };
                        defaultColumn.collapseOpen = false;
                        collapseName = collapseName.concat(defaultColumn['slot-header'].collapseColumn);
                    }
                }

                // 4、递归处理子级表头
                if (defaultColumn.children && defaultColumn.children.length > 0) {
                    defaultColumn.children = this.handleTableColumn(defaultColumn.children);
                }

                return defaultColumn;
            });

            // 剔除表头中的collapseColumn折叠项
            if (collapseName.length > 0) {
                for (let i = 0; i < newColumn.length; i++) {
                    if (collapseName.indexOf(newColumn[i].name) >= 0) {
                        newColumn.splice(i--, 1);
                    }
                }
            }

            return newColumn;
        },
        // 单元格行合并spanMerge函数
        handleSpanMethod({ row, column, rowIndex, columnIndex }) {

            const keys = Object.keys(this.spanMergeData);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                if (column.columnKey === key) {
                    let row_span = this.spanMergeData[key].spanArr[rowIndex];
                    let col_span = row_span > 0 ? 1 : 0;

                    return {
                        rowspan: row_span,
                        colspan: col_span
                    };
                }
            }

        },
        // 计算spanMerge data
        handleSpanMergeData() {
            // 计算合并行
            if (this.block.options && this.block.options['span-merge']) {
                Object.keys(this.block.options['span-merge']).forEach((val, idx) => {
                    this.spanMergeData[val] = {
                        pos: 0,
                        spanArr: [1]
                    };
                });

                for (let i = 1; i < this.tableList.length; i++) {
                    let item = this.tableList[i];
                    Object.keys(this.spanMergeData).forEach((val, idx) => {
                        if (item[val] && item[val] === this.tableList[i - 1][val]) {
                            this.spanMergeData[val].spanArr[this.spanMergeData[val].pos] += 1;
                            this.spanMergeData[val].spanArr.push(0);
                        } else {
                            this.spanMergeData[val].spanArr.push(1);
                            this.spanMergeData[val].pos = i;
                        }
                    });
                }
            }
        },
        // 为子行添加标记
        treeTableXcode(data, xcode) {
            let xCode = xcode || '';
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                item.xCode = xCode + i;
                if (item.rowchildren && item.rowchildren.length > 0) {
                    this.treeTableXcode(item.rowchildren, `${item.xCode}-`);
                }
            }
            return data;
        },
        // 表头展开折叠事件
        handleColumnCollapse(column) {
            let columnName = column.name || '';
            // 当前表头点击进行折叠处理
            if (this.collapseColumn[columnName]) {
                this.collapseColumn[columnName].collapseOpen = !this.collapseColumn[columnName].collapseOpen;
                this.block.options['table-column'] = JSON.parse(JSON.stringify(this.block.options['table-column']));
            }
        },
        // 行展开
        rowExpand(rowItem, rowIndex) {
            // 没有子表时，不用展开
            if (!rowItem.rowchildren) { return rowIndex }

            // 展开
            for (let i = 0; rowItem.rowchildren && i < rowItem.rowchildren.length; i++) {
                let child = rowItem.rowchildren[i];
                this.tableList.splice(++rowIndex, 0, child);
                if (child.rowchildren && child.rowchildren.length > 0 && child.open) {
                    rowIndex = this.rowExpand(child, rowIndex);
                }
            }

            // 重新计算spanMergeData
            this.handleSpanMergeData();

            rowItem.open = true;
            this.loading = false;
            return rowIndex;
        },
        // 行折叠
        rowCollapse(rowItem, rowIndex) {
            // 行收缩
            if (!rowItem.rowchildren) { return rowIndex }

            let collapseLen = 0;
            for (let i = rowIndex + 1; i < this.tableList.length - 1; i++) {
                let xCode = this.tableList[i].xCode;
                if (xCode.startsWith(rowItem.xCode + '-')) {
                    collapseLen++;
                } else {
                    break;
                }
            }
            this.tableList.splice(rowIndex + 1, collapseLen);
            rowItem.open = false;
            this.loading = false;
            // 重新计算spanMergeData
            this.handleSpanMergeData();
        },

        handlerSearch() {
            console.log('handlerSearch', this.searchs);
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
        }
    }
};
</script>

<style lang="scss">
.ams-block-table {
    .slot-header-icon {
        margin-left:5px;
        cursor: pointer;
    }
    .el-pagination {
        margin-top: 20px;
    }
    .el-slider__button-wrapper {
        z-index: 1;
    }
    .row-expand-cover .el-table__expand-column .cell {
        display: none;
    }
}
</style>
