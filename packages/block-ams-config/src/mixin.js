import ams from '@ams-team/ams';
import beautify from 'js-beautify';
import stringify from '@ams-team/json-stringify';

let time = null;

export default {
    props: {
        config: {
            type: Object,
            require: true
        },
        defaults: {
            type: Object,
            require: true,
            default: null
        }
    },

    data() {
        return {
            editBlockReady: false,
            previewCodeReady: false,
        };
    },

    created() {
        this.initBlockArea();
        // 延迟初始化代码区域
        setTimeout(() => {
            this.initPreviewBlock();
        }, 0);
    },

    methods: {
        initBlockArea() {
            let _this = this;

            // 配置项表单
            ams.block('$ams-config-edit', {
                type: 'form',
                resource: {
                    fields: ams.utils.deepExtend({}, this.config)
                },
                ctx: 'edit',
                blocks: {
                    baseTitle: {
                        type: 'title',
                        options: {
                            title: '基础设置'
                        },
                        slot: 'top'
                    },
                    fieldTitle: {
                        type: 'title',
                        options: {
                            title: '更多设置'
                        },
                        slot: 'field:rules'
                    },
                    blockTitle: {
                        type: 'title',
                        options: {
                            title: '更多设置'
                        },
                        slot: 'field:render'
                    }
                },
                actions: {
                    fieldChange({ path, value }) {
                        // console.log('fieldChange', path, value);
                        // 初始化时还没有this.data
                        _this.updateFieldDate();
                    }
                }
            });
            this.editBlockReady = true;
        },
        updateFieldDate() {
            clearTimeout(time);
            time = setTimeout(() => {
                let data = ams.$blocks['$ams-config-edit'].data;
                this.updatePreview(data);
                // console.log('updateFieldDate', data);
                ams.$blocks.codeForm.data.code = beautify(stringify(data), { indent_size: 2, space_in_empty_paren: true });
            }, 10);
        },

        copy(data) {
            try {
                // eslint-disable-next-line no-new-func
                return (new Function(`return ${stringify(data)}`))();
            } catch (e) {
                this.$message.error('配置解析有误，请检查');
                return data;
            }
        }
    }
};
