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
                    this.localValue = this.options.filter(item => !item.disabled).map(item => item.value);
                } else {
                    this.localValue = [];
                }
                this.$nextTick(() => {
                    this.on && typeof this.on.change === 'function' && this.on.change(this.localValue);
                });
            },
            get() {
                if (!this.localValue || this.localValue.length === 0 || !this.isShowSelectAllCheck) return false;
                const allValues = this.options.filter(item => !item.disabled).map(item => item.value);
                return allValues.every(item => this.localValue.indexOf(item) >= 0);
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
            return Boolean(this.localValue.length && this.localValue.length < this.options.filter(item => !item.disabled).length);
        },
        options() {
            let options = [];
            if (Array.isArray(this.field.props.options)) {
                if (
                    !(
                        this.field.useStringValue === false ||
                        this.isSingleOptions(this.field)
                    )
                ) {
                    this.field.props.options.forEach(item => {
                        item.value = String(item.value);
                    });
                }
                options = this.field.props.options;
            } else if (typeof this.field.props.options === 'object') {
                Object.keys(this.field.props.options).forEach(key => {
                    options.push({
                        value: key,
                        label: this.field.props.options[key]
                    });
                });
            }

            return options;
        }
    },
    methods: {
        isSingleOptions(field) {
            return (
                field.type === 'radio' ||
                (field.type === 'select' && field.props.multiple === false)
            );
        },
        initRemoteOptions(value) {
            const remoteConfig = this.field.remoteConfig;
            // 值为空时如果isInitEmpty为false则不请求
            if (!value && !remoteConfig.isInitEmpty || !remoteConfig.isInitRemoteOptions) {
                return;
            }
            this.isInitRemoteOptions = true;
            remoteConfig.remoteMethod.call(this.$block, this, value, true);
        },
        queryRemoteOptions(value) {
            const remoteConfig = this.field.remoteConfig;
            if (remoteConfig) {
                remoteConfig.remoteMethod.call(this.$block, this, value, true);
            }
        },
        initStyle() {
            if (this.$refs.select && this.$refs.select.$el) {
                this.$refs.select.$el.style.width = `${this.$refs.select.$el.offsetWidth - 55}px`;
            }
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
