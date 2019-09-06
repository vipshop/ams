import Vue from 'vue';
import ams from '../index';
import { listStringHasValue, get, getByOrder, deepExtend } from '../../utils';
import { getRouter } from './router';

export default {
    data() {
        return {
            block: null,
            data: null,
            fields: null,
            layout: null,
            resource: null,
            ready: false,
            loading: false
        };
    },
    provide: function() {
        return {
            fieldChange: this.fieldChange,
            $block: this
        };
    },
    props: {
        name: {
            type: String,
            default: '',
            required: true
        }
    },

    async created() {
        await this.initBlock();
        this.setBlockData(this.block.data);
        // 路由初始化
        this.initRouter();
        this.$nextTick(async () => {
            // 初始化init
            this.ready = true;
            await this.emitEvent('created');
            await this.emitEvent('init');

            this.afterReady && this.afterReady();
        });
    },

    computed: {
        on() {
            const on = {};

            if (this.block && this.block.on) {
                Object.keys(this.block.on).forEach(key => {
                    on[key] = (...args) => {
                        return this.block.on[key].call(this, ...args);
                    };
                });
            }

            return on;
        }
    },

    async destroyed() {
        await this.emitEvent('destroyed');
        delete ams.$blocks[this.name];
    },

    watch: {
        name(val, oldVal) {
            if (val) {
                this.initBlock();
            }
            // 删除旧的引用
            if (ams.$blocks[oldVal]) {
                delete ams.$blocks[oldVal];
            }
        }
    },
    methods: {
        showLoading() {
            if (this.block && this.block.options.showLoading !== false) {
                this.loading = true;
            }
        },
        hideLoading() {
            if (this.block && this.block.options.showLoading !== false) {
                this.loading = false;
            }
        },
        getOperationsCounts() {
            // console.log('getOperationsCounts:');
            let counts = {};
            if (this.block) {
                if (this.block.operations) {
                    Object.keys(this.block.operations).forEach(key => {
                        let operaSlot = this.block.operations[key].slot || 'operations';
                        if (!counts[operaSlot]) {
                            counts[operaSlot] = 1;
                        } else {
                            counts[operaSlot]++;
                        }
                    });
                }
                this.block.operationsCounts = counts;
            }
        },
        getConfig(key) {
            return getByOrder(get(this, key), get(ams.configs, key));
        },
        initRouter() {
            if (this.block.router) {
                this.routerReady = false;
                ams.$router = getRouter(
                    this.block.router
                );
                Object.keys(this.on).forEach(key => {
                    ams.$router[key](this.on[key]);
                });
                Vue.component('ams-router').options.router = ams.$router;

                this.$nextTick(() => {
                    this.routerReady = true;
                });
            }
        },
        /**
         * 如果新增、删除fields，需要触发initBlock
         */
        async initBlock() {
            this.block = await ams.getBlock(this.name);
            if (this.block) {
                this.resource =
                    typeof this.block.resource === 'string'
                        ? ams.resources[this.block.resource]
                        : ams.resource('', this.block.resource);
                ams.$blocks[this.name] = this;
                this.initFields();
                this.getOperationsCounts();
            } else {
                this.resource = null;
                this.fields = null;
            }
        },
        // 深度补充field的默认参数
        initDefaultField(field) {
            // 跳过空field
            if (!field) {
                return;
            }
            // console.log('initDefaultField', JSON.stringify(field));
            const baseFieldType = ams.configs.baseFieldType[field.type];
            if (baseFieldType === 'array') {
                field.field && this.initDefaultField(field.field);
            } else if (baseFieldType === 'object' || baseFieldType === 'union') {
                field.fields && Object.keys(field.fields).forEach(key => this.initDefaultField(field.fields[key]));
            } else {
                let defaultField = ams.configs.defaultFieldConfig[field.type];
                if (defaultField) {
                    Object.keys(defaultField).forEach(key => {
                        // 只处理props，如果默认配置新增其它对象值需要在此补充
                        if (key === 'props') {
                            if (field.props) {
                                Object.keys(defaultField.props).forEach(propKey => {
                                    if (!(propKey in field.props)) {
                                        field.props[propKey] = defaultField.props[propKey];
                                    } else if (propKey === 'props') {
                                        field.props[propKey] = Object.assign(
                                            defaultField.props[propKey] || {},
                                            field.props[propKey] || {}
                                        );
                                    }
                                });
                            } else {
                                field.props = JSON.parse(JSON.stringify(defaultField.props));
                            }
                        } else if (!(key in field)) {
                            field[key] = defaultField[key];
                        }
                    });
                }
            }
            // 补充默认ctx
            if (!field.ctx) {
                field.ctx = this.block.ctx || 'view';
            }
        },
        initFields() {
            // 为了可以做过滤、合并props等功能、通过computed属性重新处理field列表
            // 为了上层可以快速定位修改
            if (this.resource && this.resource.fields) {
                const fields = {};
                let fieldKeys = Object.keys(this.resource.fields);
                fieldKeys.forEach(name => {
                    const resourceField = this.resource.fields[name];
                    let blockField =
                        this.block.fields && this.block.fields[name];
                    // 字段隐藏，bock内可以通过 fields: {testMarkdown: false} 隐藏字段
                    if (blockField === false) {
                        return;
                    }
                    blockField = blockField || {};

                    const field = {
                        // 默认block级ctx
                        name,
                        ctx: this.block.ctx || 'view',
                        props: {},
                        on: {}
                    };
                    // 按优先级测试合并
                    // deepExtend(field, defaultFieldConfig[blockField.type || resourceField.type]);
                    deepExtend(field, resourceField);
                    deepExtend(field, blockField);
                    this.initDefaultField(field);
                    // console.log(field);
                    // 处理列表
                    if (ams.configs.baseBlockType[this.block.type] === 'list') {
                        // 排序
                        if (this.block.sorts[name]) {
                            field.props.sortable = 'custom';
                        }
                        // 过滤
                        const filter = this.block.filters[name];
                        if (filter) {
                            let filterOptions =
                                filter.options || field.props.options;

                            if (filterOptions) {
                                if (Array.isArray(filterOptions)) {
                                    filterOptions = filterOptions.map(option => {
                                        return {
                                            text: option.label,
                                            value: option.value,
                                        };
                                    });
                                } else {
                                    filterOptions = Object.keys(filterOptions).map(
                                        key => {
                                            const label = filterOptions[key];
                                            return {
                                                text: label,
                                                value: key
                                            };
                                        }
                                    );
                                }
                                field.props.filters = filterOptions;
                                field.props[
                                    'filter-multiple'
                                ] = !!filter.multiple;
                                if (!filter.remote) {
                                    field.props['filter-method'] = (
                                        value,
                                        row,
                                        column
                                    ) => {
                                        // console.log('filter-method', value, row, column);
                                        return listStringHasValue(
                                            row[name],
                                            value
                                        );
                                    };
                                }
                            }
                        }
                    }
                    fields[name] = field;
                });
                this.fields = fields;
                this.layout = this.getFieldsLayout(fields, this.block.layout);
                // console.log(this.layout)
            } else {
                this.fields = null;
            }
        },
        getFieldsLayout(fields, layout) {
            let la = {};
            Object.keys(fields).forEach(key => { la[key] = key });
            // la = deepExtend(la, layout);
            for (let key in layout) {
                if (layout.hasOwnProperty(key)) {
                    let item = layout[key];
                    if (Array.isArray(item)) {
                        for (let i = 0; i < item.length; i++) {
                            if (item[i] !== key) {
                                la[item[i]] = false;
                            }
                        }
                    }
                    la[key] = item;
                }
            }
            return la;
        },
        setBlockData(data) {
            if (['form'].indexOf(this.block.type) > -1) {
                // 只有form才会通过field setData，初始化fieldChange
                let dt = this.setFieldData(data, {
                    type: 'object',
                    fields: this.fields
                });
                this.data = { ...this.data, ...data, ...dt };
            } else {
                this.data = { ...this.data, ...data, ...JSON.parse(JSON.stringify(data)) };
            }
            // console.log(JSON.stringify(this.data))
        },
        setFieldData(data, field, path = '') {
            const type = ams.configs.baseFieldType[field.type] || field.type;
            // 初始化
            if (type === 'object') {
                let res = {};
                data = data || field.default || {};
                // 深拷贝默认值
                if (field.fields) {
                    Object.keys(field.fields).forEach(key => {
                        // 增加空判断
                        if (field.fields[key]) {
                            res[key] = this.setFieldData(
                                data[key],
                                field.fields[key],
                                // 根目录省略.开头
                                path ? `${path}.${key}` : key
                            );
                        }
                    });
                } else {
                    res = JSON.parse(JSON.stringify(data));
                }
                this.emitEvent('fieldChange', {
                    field,
                    name: field.name,
                    value: data,
                    path
                });
                return res;
            } else if (type === 'array') {
                const res = [];
                data = data || field.default;
                if (data && field.field) {
                    for (let i = 0; i < data.length; i++) {
                        res.push(
                            this.setFieldData(
                                data[i],
                                field.field,
                                `${path}[${i}]`
                            )
                        );
                    }
                }
                this.emitEvent('fieldChange', {
                    field,
                    name: field.name,
                    value: data,
                    path
                });
                return res;
            } else if (type === 'union' && field.fields && field.current && field.fields[field.current]) {
                // 根据实际的field设置union的默认值
                data = data || field.default;
                return this.setFieldData(
                    data,
                    field.fields[field.current],
                    path
                );
            } else {
                if (typeof data === 'undefined') {
                    // 默认值
                    data = field.default;
                }
                if (typeof data !== 'undefined') {
                    // fieldChange event
                    this.emitEvent('fieldChange', {
                        field,
                        name: field.name,
                        value: data,
                        path
                    });
                }
                return data;
            }
        },
        // 用于更新local值
        fieldChange(value, field, path) {
            // console.log('fieldChange', value, field, path, this.data);
            // this.data[field.name] = value;
            if (!ams.utils.set(this.data, path, value)) {
                console.warn(`set ${path} fail`);
            }
            this.emitEvent('fieldChange', {
                field,
                name: field.name,
                value,
                path
            });
        },
        async emitEvent(name, args) {
            // console.log('emitEvent', name, args)
            if (name) {
                const action = this.block.events[name];
                // 保证传入action的都是一个对象
                args = args || {};
                if (action) {
                    await this.callAction(action, args);
                } else {
                    // 如果没有绑定event、默认调用同名action、这样可以简化减少如 evnets:{list:'@list'} 的配置
                    await this.callAction(`@${name}`, args);
                }
            }
        },
        async callAction(...args) {
            await ams.callAction.call(this, ...args);
            return ams.$prevReturn;
        }
    }
};
