<!--
    增加注释，解释 template 中 getShowState、getField 的作用

    以一个 list block 为例
    {
        type: 'list',
        fields: {
            'status': {
                'type': 'text',
                'label': 'status',
                view(fieldValue, field) {
                    return fieldValue > 0 ? `+${fieldValue}` : `-${fieldValue}`
                },
            },
        }
    }
    其中
    - scope.row 为：
        {
            "id": 21,
            "email": "test-create-dsp@demo.com",
            "status": 2,
        }

    - getShowState(field, scope.row) 为：true


    - getField(field, scope.row) 为：
        {
            "name": "status",
            "ctx": "view",
            "props": {
                "clearable": true
            },
            "on": {},
            "type": "text",
            "label": "status",
            "default": ""
        }

    - `list[${scope.$index}].${fieldName}` 为(其中一个)：list[0].status
-->
<template>
    <div v-if="ready"
         class="ams-block-list"
         :style="block.style"
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
        <ams-operations :name="name"
                        :context="batchSelected"
                        v-if="batchSelected.length > 0 || block.options.multipleSelectAffixShow"
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
                      :class="[isDrag ? 'ams-block-list-drag' : '']"
                      highlight-current-row>

                <template v-if="expandFields">
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <vnode
                                v-if="block.expandRender"
                                :render="block.expandRender"
                                :scope="scope"
                            />
                            <el-form
                                v-else
                                class="ams-block-list-expand"
                                :label-width="block.props && block.props['label-width'] || '100px'"
                            >
                                <el-form-item v-for="(field, fieldName) in expandFields"
                                            :key="fieldName"
                                            :label="field.label"
                                            :label-width="field.labelWidth"
                                            :prop="field.type !== 'array' && field.type !== 'object' ? fieldName : ''">

                                    <template v-if="field.label" slot="label">
                                        <el-tooltip effect="dark" placement="top" v-if="field.info">
                                            <i class="el-icon-info ams-form-label-info"></i>
                                            <div slot="content" v-html="field.info"></div>
                                        </el-tooltip>
                                        {{field.label}}
                                    </template>

                                    <component :is="`ams-field-${field.type}-view`"
                                            :field="field"
                                            :value="scope.row[fieldName]"
                                            :ref="`$${fieldName}`"
                                            :name="name"
                                            :path="fieldName"
                                            :context="scope.row"
                                            :class="`ams-field ams-field-${field.type}-view`" />
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                </template>

                <el-table-column label="#拖拽" width="70" align="center" v-if="isDrag && block.options.showDragIcon !== false">
                    <div class="drag-column"><i class="el-icon-thumb"></i></div>
                </el-table-column>

                <el-table-column v-if="block.options.multipleSelect"
                                 type="selection"
                                 :selectable="columnAttrs['selectable']"
                                 :reserve-selection="columnAttrs['reserve-selection']"
                                 :width="selectionProps.width || 50"
                                 v-bind="selectionProps" />

                <el-table-column v-if="block.props.type === 'index'"
                                 type="index"
                                 align="center" />

                <!-- 含有多级表格配置的处理 -->
                <template v-if="tableColumnSelected.length">
                    <el-table-column v-for="(column, index) in tableColumnSelected"
                                        v-if="!column.hidden"
                                        :key="column.name || index"
                                        :prop="column.name"
                                        :label="column.label"
                                        :column-key="column.name"
                                        v-bind="column.props"
                                        fit
                                        :min-width="column.props['min-width'] || defaultListFieldWidth[column.type] || '90px'"
                                        :align="column.props['align'] || 'center'">
                        <!-- 第一层表头的处理 -->
                        <template slot="header" v-if="column.name">
                            {{column.label}}
                            <el-tooltip effect="dark" placement="top" v-if="column.info">
                                <i :class="column.info.icon || 'el-icon-info'"></i>
                                <div slot="content" v-html="column.info.content || column.info"></div>
                            </el-tooltip>
                        </template>
                        <template slot-scope="scope" v-if="column.name">
                            <field
                                v-if="getShowState(column, scope.row)"
                                :field="getField(column, scope.row)"
                                :value="scope.row[column.name]" :name="name"
                                :context="scope.row"
                                :path="`list[${(isSimulatePagination ? ((data.page - 1) * data.pageSize) : 0) + scope.$index}].${column.name}`"/>
                        </template>

                        <!-- 第二层表头的处理 -->
                        <template v-if="column.children && column.children.length > 0">
                            <template v-for="(item) in column.children">
                                    <el-table-column :label="fields[item.name].label"
                                                v-if="!fields[item.name].hidden"
                                                :key="item.name"
                                                :prop="item.name"
                                                type=""
                                                :column-key="item.name"
                                                fit
                                                :min-width="fields[item.name].props['min-width'] || defaultListFieldWidth[fields[item.name].type] || '90px'"
                                                :align="fields[item.name].props['align'] || 'center'"
                                                v-bind="fields[item.name].props">
                                    <template slot="header">
                                        {{fields[item.name].label}}
                                        <el-tooltip effect="dark" placement="top" v-if="fields[item.name].info">
                                            <i :class="fields[item.name].info.icon || 'el-icon-info'"></i>
                                            <div slot="content" v-html="fields[item.name].info.content || fields[item.name].info"></div>
                                        </el-tooltip>
                                    </template>
                                    <template slot-scope="scope">
                                        <field v-if="getShowState(fields[item.name], scope.row)" :field="getField(fields[item.name], scope.row)" :value="scope.row[item.name]" :name="name" :context="scope.row"
                                            :path="`list[${(isSimulatePagination ? ((data.page - 1) * data.pageSize) : 0) + scope.$index}].${item.name}`"/>
                                    </template>
                                </el-table-column>
                            </template>
                        </template>
                    </el-table-column>
                </template>

                <el-table-column label="操作"
                                 v-if="block.operationsCounts.operations"
                                 fixed="right"
                                 min-width="140px"
                                 :width="operationsWidth"
                                 :align="operationsAlign"
                                 class-name="ams-list-row-operations">
                    <template slot-scope="scope">
                        <ams-operations :name="name"
                                        :slot-field-key="`defaultOperations${scope.$index}`"
                                        :context="{ __index: scope.$index, ...scope.row }"></ams-operations>
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
                       :disabled="loading"
                       :current-page.sync="data.page"
                       :page-size.sync="data.pageSize"
                       :page-sizes="data.pageSizes"
                       :layout="data.layout"
                       background
                       align="right"
                       :total="pageTotal">
        </el-pagination>

        <ams-blocks :blocks="block.blocks" />

        <el-dialog
            title="表头管理"
            :visible.sync="headerSelectedDialog.show"
            width="50%">
            <el-checkbox-group v-model="headerSelectedDialog.headers">
                <el-checkbox v-for="column in tableColumnOptions"
                    :label="column.name"
                    :key="column.name"
                    :style="{ width: headerSelectedDialog.labelWidth }">{{column.label}}
                </el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="headerSelectedDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleHeaderSelectedChange">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import { operationsWidth } from '../../ams/mixins/computed';
import { defaultListFieldWidth } from '../../ams/configs/field';
import { addEvent, getDomPos, getDomStyle, debounce, loadJS, sortBy, deepExtend, getType } from '../../utils/index';
import field from '../../components/field';
import { LocalStorage } from '../../utils';

export default {
    components: {
        field
    },
    mixins: [
        mixins.blockMixin,
        mixins.getField,
        mixins.getShowState,
        mixins.vnodeMixin
    ],
    data() {
        return {
            defaultListFieldWidth,
            filters: {},
            sortField: null,
            sortOrder: null,
            batchSelected: [],
            headerSelected: [],
            height: null,

            headerSelectedDialog: {
                show: false,
                headers: [],
                labelWidth: '100px' // 预留配置项
            }
        };
    },
    computed: {
        isDrag() {
            return this.block.options && this.block.options.drag;
        },
        isSimulatePagination() {
            return this.block.props && this.block.props.pagination === 'simulate';
        },
        // 是否多级表头
        isMultiTableColumn() {
            const options = this.block.options;
            return options && options['table-column'] && options['table-column'].length;
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
        operationsWidth,
        operationsAlign() {
            const props = this.block.props || {};
            if (props && props['operations-align']) {
                return props['operations-align'];
            }
            return 'center';
        },
        selectionProps() {
            const props = this.block.props || {};
            if (props && props['selection-props']) {
                return props['selection-props'];
            }
            return {};
        },
        expandFields() {
            // 获取展开列表展开表单的fields
            if (this.block.expand && Object.keys(this.block.expand).length > 0) {
                const fields = {};
                let fieldKeys = Object.keys(this.block.expand);
                fieldKeys.forEach(name => {
                    if (this.fields[name]) {
                        fields[name] = this.fields[name];
                    }
                });
                return fields;
            } else {
                return false;
            }
        },
        columnAttrs() {
            return this.block.props && this.block.props.column || {};
        },
        // 可选择的列，初始化结果，带chilren
        tableColumn() {
            const options = this.block.options;
            if (this.isMultiTableColumn) {
                return this.handleTableColumn(options['table-column']);
            } else if (getType(this.fields) === 'object') {
                return Object.keys(this.fields).map(val => this.fields[val]);
            }
            return [];
        },
        // 已经选择的列，带children
        // [
        //     { label: 'id', name: 'id ' },
        //     { label: 'field', children: [] }
        // ]
        tableColumnSelected() {
            const headerSelected = this.headerSelected;
            if (this.isMultiTableColumn) {
                const tableColumn = JSON.parse(JSON.stringify(this.tableColumn));
                return tableColumn.filter(item => {
                    let children = item.children;
                    if (children && children.length) {
                        item.children = children.filter(child => headerSelected.indexOf(child.name) >= 0);
                        return children.length;
                    }
                    return headerSelected.indexOf(item.name) >= 0;
                });
            }
            return this.tableColumn.filter(val => headerSelected.indexOf(val.name) >= 0);
        },
        // 可选择的列，用于弹窗展示，不带children。如多级表头，将chilren扁平化合在一个array中
        tableColumnOptions() {
            const tableColumn = this.tableColumn;
            if (this.isMultiTableColumn) {
                return tableColumn.reduce((arr, cur) => {
                    const children = cur.children;
                    if (children && children.length) {
                        arr = arr.concat(cur.children.map(item => ({ label: item.label, name: item.name })));
                    } else if (cur.name) {
                        arr.push({ label: cur.label, name: cur.name });
                    }
                    return arr;
                }, []);
            }
            return tableColumn;
        },
    },
    methods: {
        afterReady() {
            this.headerSelected = this.handleGetHeaderSelected();
            // 表格拖拽
            if (this.isDrag) {
                const dragOptions = this.block && this.block.dragOptions || {};

                this.loadSortable(dragOptions);
            }

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
        async loadSortable(dragOptions) {
            // 加载sortable
            if (!window.Sortable) {
                const res = await loadJS('http://h5rsc.vipstatic.com/ams/sortable@1.10.0.js');

                if (res.code === 0) {
                    this.drag(dragOptions);
                } else {
                    console.warn('fail: 列表拖拽插件加载失败');
                }
            } else {
                this.drag(dragOptions);
            }
        },
        handleDragOptions(dragOptions) {
            // 列表区块原有的默认配置，需兼容，因此当作默认配置
            const defaultOptions = {
                sort: true,
                revert: true,
                disabled: false,
                handle: '.drag-column',
                ghostClass: 'sortable-ghost'
            };

            // 事件配置
            const eventOptions = {
                onStart: (evt) => {
                    // 触发回调
                    this.on['drag-start'] && this.on['drag-start'](evt);
                },
                onEnd: (evt) => {
                    const { oldIndex, newIndex } = evt;
                    const newList = JSON.parse(JSON.stringify(this.data.list));
                    const currRow = newList.splice(oldIndex, 1)[0];
                    newList.splice(newIndex, 0, currRow);

                    // 记录高度
                    const height = this.$refs.amsTable.$el.scrollHeight;
                    // 设置高度
                    this.$refs.amsTable.$el.style.height = height + 'px';
                    // 修改单个row，且有operation时错乱，先请空触发渲染
                    this.data.list = [];
                    // 渲染完监听，重新赋值
                    this.$nextTick(() => {
                        this.data.list = newList;
                        this.$refs.amsTable.$el.style.height = '';
                        // 触发回调
                        this.on['drag-end'] && this.on['drag-end'](evt);
                    });
                },
                onChoose: (evt) => {
                    this.on['drag-choose'] && this.on['drag-choose'](evt);
                },
                onUnchoose: (evt) => {
                    this.on['drag-unchoose'] && this.on['drag-unchoose'](evt);
                },
                onAdd: (evt) => {
                    this.on['drag-add'] && this.on['drag-choose'](evt);
                },
                onUpdate: (evt) => {
                    this.on['drag-update'] && this.on['drag-update'](evt);
                },
                onSort: (evt) => {
                    this.on['drag-sort'] && this.on['drag-choose'](evt);
                },
                onRemove: (evt) => {
                    this.on['drag-remove'] && this.on['drag-choose'](evt);
                },
                onFilter: (evt) => {
                    this.on['drag-filter'] && this.on['drag-choose'](evt);
                },
                onMove: (evt, originalEvent) => {
                    this.on['drag-move'] && this.on['drag-choose'](evt, originalEvent);
                },
                onClone: (evt) => {
                    this.on['drag-clone'] && this.on['drag-choose'](evt);
                },
                onChange: (evt) => {
                    this.on['drag-change'] && this.on['drag-choose'](evt);
                },
                setData: (dataTransfer, dragEl) => {
                    this.on['drag-set-data'] && this.on['drag-choose'](dataTransfer, dragEl);
                }
            };

            // 在列表中事件挂在 `on` 下，因此需覆盖 `dragOptions` 下的事件入参
            return {
                ...defaultOptions,
                ...dragOptions,
                ...eventOptions
            };
        },
        drag(dragOptions) {
            if (window.Sortable && this.$refs.amsTable) {
                const el = this.$refs.amsTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
                window.Sortable.create(el, this.handleDragOptions(dragOptions));
            }
        },
        heightFit() {
            if (this.$refs.amsTable) {
                // 屏幕高度
                let clientH = document.documentElement.clientHeight || document.body.clientHeight;
                // form离body顶部距离
                let domOffsetTop = getDomPos(this.$refs.amsTable.$el).top;

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
            // 阻止列表搜索栏的回车搜索事件
            if (this.block.props && this.block.props['enterkey-search'] === false) {
                return false;
            } else {
                this.data.page = 1;
                this.emitEvent('list');
            }
        },
        handleSizeChange() {
            console.log('handleSizeChange');
            this.data.page = 1;
            if (this.on && this.on['size-change']) {
                this.on['size-change'](this.data.page);
            }
            this.emitEvent('list');
        },
        handleCurrentChange(e) {
            console.log('handleCurrentChange');
            if (this.on && this.on['current-change']) {
                this.on['current-change'](this.data.page);
            }
            if (this.isSimulatePagination) {
                return;
            }
            this.emitEvent('list');
        },
        handleSortChange({ column, prop, order }) {
            console.log('handleSortChange', prop, order);
            this.sortField = prop;
            this.sortOrder = order;
            this.data.page = 1;
            if (!this.isSimulatePagination) {
                this.emitEvent('list');
            } else {
                this.data.list = sortBy(this.data.list, { [prop]: order });
            }
        },
        handleFilterChange(e) {
            console.log('handleFilterChange', e);
            // 远程筛选
            let remoteFilterChange = false;
            Object.keys(e).forEach(key => {
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
        },
        // 处理多级表头数据
        // TODO 暂时复用了table的方法，后续list和table准备合并为一个区块
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

                // 1、如果表头含有fields则合并fields到defaultColumn
                if (this.fields[val.name]) {
                    deepExtend(defaultColumn, this.fields[val.name]);
                }

                // 2、合并option中数据到defaultColumn
                deepExtend(defaultColumn, val);

                // 3、递归处理子级表头
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
        showHeaderSelectedDialog() {
            this.headerSelectedDialog.show = true;
            this.headerSelectedDialog.headers = this.handleGetHeaderSelected();
        },
        handleGetHeaderSelected() {
            const name = this.name;
            let headerFromStorage = LocalStorage.get(`BLOCK_${name}`);

            // 从Storage取出来的field要跟resource做对比
            const resourceFieldKeys = Object.keys(this.resource.fields);
            headerFromStorage = headerFromStorage && headerFromStorage.split(',');
            if (resourceFieldKeys && headerFromStorage && headerFromStorage.length) {
                headerFromStorage = headerFromStorage.filter(header => resourceFieldKeys.indexOf(header) >= 0);
            }
            if (headerFromStorage && headerFromStorage.length) {
                return headerFromStorage;
            }

            if (this.isMultiTableColumn) {
                return this.tableColumn.reduce((arr, cur) => {
                    const children = cur.children;
                    if (children && children.length) {
                        arr = arr.concat(cur.children.map(item => item.name));
                    } else if (cur.name) {
                        arr.push(cur.name);
                    }
                    return arr;
                }, []);
            } else if (getType(this.fields) === 'object') {
                return this.tableColumn.map(item => item.name);
            }
        },
        handleHeaderSelectedChange() {
            LocalStorage.set(`BLOCK_${this.name}`, this.headerSelectedDialog.headers.join(','));
            this.headerSelected = this.headerSelectedDialog.headers;
            this.headerSelectedDialog.show = false;

            // 修改列，且有operation时错乱，先请空触发渲染
            const newList = JSON.parse(JSON.stringify(this.data.list));
            this.data.list = [];
            this.$nextTick(() => {
                this.data.list = newList;
            });
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
    td.ams-list-row-operations {
        padding-bottom: 0;
        .cell {
            overflow: inherit;
        }
        .ams-operations .el-form-item .el-form-item__content {
            line-height: initial;
        }
    }
    // 列表拖拽鼠标
    .ams-block-list-drag{
        .el-table__body-wrapper {
            .drag-column {
                .el-icon-thumb {
                    font-size: 18px;
                }
                text-align: center;
                cursor: move;
            }
        }

        .ams-list-row-operations {
            cursor: auto;
        }
    }

    // 列表展开表单样式调整
    .ams-block-list-expand {
        .el-form-item {
            margin-bottom: 10px;
            .el-form-item__content {
                color: #000;
            }
        }
        // array
        .el-form-item.ams-array-item{
            margin-bottom: 10px;
            .el-form-item__content{
                line-height: 40px;
            }
        }
    }
}
</style>
