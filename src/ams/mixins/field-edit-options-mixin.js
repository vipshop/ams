import { getType } from '../../utils';

export default {
    data() {
        return {
            loading: false,
            isInitRemoteOptions: false
        };
    },
    computed: {
        isSelectAll: {
            set(val) {
                if (val) {
                    this.localValue = this.options
                        .filter(item => !item.disabled)
                        .map(item => item.value);
                } else {
                    this.localValue = [];
                }
                this.$nextTick(() => {
                    // https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining
                    typeof this.on?.change === 'function' &&
                        this.on.change(this.localValue);
                });
            },
            get() {
                if (
                    !this.localValue ||
                    this.localValue.length === 0 ||
                    !this.isShowSelectAllCheck
                ) { return false }
                const allValues = this.options
                    .filter(item => !item.disabled)
                    .map(item => item.value);
                return allValues.every(
                    item => this.localValue.indexOf(item) >= 0
                );
            }
        },
        isShowSelectAllCheck() {
            const field = this.field;
            if (field.type === 'checkbox') {
                return field.props['select-all'];
            }
            return field.props.multiple && field.props['select-all'];
        },
        indeterminate() {
            return Boolean(
                this.localValue.length &&
                    this.localValue.length <
                        this.options.filter(item => !item.disabled).length
            );
        },
        options() {
            let options = this.field.props.options;
            const type = getType(options);
            switch (type) {
                case 'array':
                    this.mayStringifyOptionValue(options);
                    break;
                case 'object':
                    options = this.object2Array(options);
                    break;
                default:
                    break;
            }
            return options;
        }
    },
    methods: {
        /**
         * 按需将option.value 转为字符串类型
         * @param {*} options
         */
        mayStringifyOptionValue(options) {
            // 注意这里 !== false，和默认为true是两种含义，因为有可能不配置 useStringValue，即： field = {}
            // [设计原则]这里感觉设计上不合理，后期设计API需要考虑：如果用户需要，可以通过开关打开，而不是默认打开，通过开关进行关闭
            if (
                !(
                    this.field.useStringValue === false ||
                    this.isSingleOptions(this.field)
                )
            ) {
                options.forEach(item => {
                    item.value = String(item.value);
                });
            }
        },
        /**
         * 对象转数组 {value: label} => [{ label, value }]
         * @param {*} optionsObj {value1: label1, value2: label2}
         * @returns [{ label, value }]
         */
        object2Array(optionsObj) {
            return Object.entries(optionsObj).map(([key, value]) => ({ label: value, value: key }));
        },
        isSingleOptions(field) {
            const singleSelect =
                field.type === 'select' && field.props.multiple === false; // 单选
            return field.type === 'radio' || singleSelect;
        },
        initRemoteOptions(value) {
            const { isInitEmpty, isInitRemoteOptions, remoteMethod } = this.field.remoteConfig;
            const isInitWhenEmptyValue = !value && isInitEmpty; // // 值为空 && 允许空值检索
            if (isInitWhenEmptyValue || isInitRemoteOptions) {
                this.isInitRemoteOptions = true;
                remoteMethod.call(this.$block, this, value, true);
            }
        },
        queryRemoteOptions(value) {
            const remoteConfig = this.field.remoteConfig;
            if (remoteConfig) {
                remoteConfig.remoteMethod.call(this.$block, this, value, true);
            }
        },
        initStyle() {
            if (!this.$refs.select?.$el) return;
            this.$refs.select.$el.style.width = `${this.$refs.select.$el
                .offsetWidth - 55}px`;
        }
    },

    watch: {
        value(val) {
            if (this.field.remoteConfig && !this.isInitRemoteOptions) {
                this.initRemoteOptions(val);
            }
        }
    },

    created() {
        // 非远程搜索，但是可以借助远程搜索的能力，实现通过API加载下拉菜单
        if (this.field.isInitOptionsWithAPI) {
            this.field.props.remote = false;
            this.field.remoteConfig && (this.field.remoteConfig.isInitEmpty = true);
        }
        if (this.field.remoteConfig) {
            this.initRemoteOptions(this.value);
        }
        if (this.isShowSelectAllCheck) {
            this.$nextTick(() => {
                this.initStyle();
            });
        }
    }
};
