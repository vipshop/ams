export default {
    data() {
        return {
            loading: false,
            isInitRemoteOptions: false
        };
    },
    computed: {
        selectOptions() {
            let arr = [];
            if (typeof this.value !== 'undefined') {
                // 使用typeof判断是为了兼容当值为空或者0的情况
                let val = this.field.view ? this.field.view(this.value, this.field, this.context) : this.value;
                const vals = String(val).split(',');
                // let options = this.field.props.options;
                let options = {};
                if (Array.isArray(this.field.props.options)) {
                    this.field.props.options.forEach(item => {
                        options[item.value] = item.label;
                    });
                    // console.log(options);
                } else {
                    options = this.field.props.options || {};
                }
                vals.forEach(val => {
                    arr.push(options.hasOwnProperty(val) ? options[val] : val);
                });
            }
            return arr;
        },
        showOptionsLimit() {
            const limit = this.field.collapseLimit;
            if (limit) {
                return typeof limit === 'number' ? limit : 1;
            }
            return this.selectOptions.length;
        },
        showMoreIcon() {
            return this.field.collapseLimit && this.selectOptions.length > this.showOptionsLimit;
        },
        actualSelectOptionsText() {
            if (this.showMoreIcon) {
                return this.selectOptions.slice(0, this.showOptionsLimit).join('，');
            }
            return this.selectOptions.join('，');
        },
        dropdownOptions() {
            return this.selectOptions.slice(this.field.collapseLimit);
        }
    },


    methods: {
        initRemoteOptions(value) {
            const remoteConfig = this.field.remoteConfig;
            // 值为空时如果isInitEmpty为false则不请求
            if (!value && !remoteConfig.isInitEmpty || !remoteConfig.isInitRemoteOptions) {
                this.isInitRemoteOptions = true;
                return;
            }
            this.isInitRemoteOptions = true;
            remoteConfig.remoteMethod.call(this.$block, this, value, true);
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
    }
};
