<template>
    <div class="ams-config-content">
        <ams-block name="$ams-config-edit" v-if="editBlockReady" class="edit"></ams-block>
        <ams-block name="$ams-config-preview" v-if="previewCodeReady" class="preview"></ams-block>
        <args :config="config"/>
    </div>
</template>

<script>
/* eslint-disable max-depth,no-undefined */
import ams from '@ams-team/ams';
import beautify from 'js-beautify';
import stringify from '@ams-team/json-stringify';
import mixin from './mixin';
import args from './args';

export default {
    components: {
        args
    },
    mixins: [mixin],
    methods: {
        initPreviewBlock() {
            let _this = this;
            ams.resource('previewRes', {
                fields: {
                    id: {
                        type: 'text',
                        label: 'id'
                    }
                    // current
                }
            });
            // 常用配置
            const previewBlock = {
                blocks: {
                    normalTitle: null,
                    codeTitle: {
                        type: 'title',
                        options: {
                            title: '配置'
                        }
                    },
                    codeForm: {
                        type: 'form',
                        ctx: 'edit',
                        resource: {
                            fields: {
                                code: {
                                    labelWidth: '0',
                                    type: 'ams-code',
                                    on: {
                                        change(code) {
                                            // console.log('change code', code);
                                            try {
                                                // eslint-disable-next-line no-new-func
                                                let data = (new Function(`return ${code}`))();
                                                ams.$blocks['$ams-config-edit'].data = data;
                                                // console.log(data);
                                                _this.updatePreview(data);
                                            } catch (error) {
                                                console.dir(error);
                                                _this.$message.error('配置数据格式有误，请检查');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    editTitle: {
                        type: 'title',
                        options: {
                            title: '编辑状态预览'
                        },
                    },
                    form: {
                        type: 'form',
                        resource: 'previewRes',
                        fields: {
                            id: false,
                        },
                        style: {
                            paddingTop: '10px',
                            paddingBottom: '10px'
                        },
                        data: {
                            edit: undefined,
                            view: undefined,
                            value: undefined
                        },
                        actions: {
                            fieldChange({ path, value }) {
                                // console.log(path, value, this.data);
                                setTimeout(() => {
                                    let value = this.data.edit;
                                    this.data.view = value;
                                    this.data.value = JSON.stringify(value);
                                    ams.$blocks.list.data.list.forEach(item => { item.view = value });
                                    this.$set(ams.$blocks.list.data, 'list', _this.copy(ams.$blocks.list.data.list));
                                }, 0);
                            }
                        },
                        ctx: 'edit',
                        blocks: {
                            formTitle: {
                                type: 'title',
                                options: {
                                    title: '展示状态预览'
                                },
                                slot: 'field:value'
                            }
                        }
                    },
                    viewTitle: {
                        type: 'title',
                        options: {
                            title: '列表状态预览'
                        },
                    },
                    list: {
                        type: 'list',
                        resource: 'previewRes',
                        fields: {
                            edit: false,
                            value: false
                        },
                        data: {
                            list: [
                                { id: 1, view: undefined },
                                { id: 2, view: undefined }
                            ]
                        }
                    }
                }
            };
            const keys = this.defaults ? Object.keys(this.defaults) : [];
            const normalTitle = {
                type: 'title',
                options: {
                    title: '常用配置'
                },
                operations: {},
                events: {
                    reset: '@$ams-config-edit.resetData'
                },
                actions: {
                    select({ $arg }) {
                        // console.log('_this.defaults[$args]', _this.defaults, $arg);
                        ams.$blocks.codeForm.data.code = beautify(stringify(_this.defaults[$arg]), { indent_size: 2, space_in_empty_paren: true });
                    }
                },
            };
            keys.forEach(key => {
                normalTitle.operations[key] = {
                    type: 'button',
                    label: key,
                    props: {
                        type: 'primary',
                        plain: true
                    },
                    event: `select:${key}`
                };
            });
            normalTitle.operations.reset = {
                type: 'button',
                label: '重置'
            };
            previewBlock.blocks.normalTitle = normalTitle;

            ams.block('$ams-config-preview', previewBlock);
            this.previewCodeReady = true;
        },
        updatePreview(data) {
            ams.resources.previewRes.fields.edit = this.copy(data);
            ams.resources.previewRes.fields.edit.ctx = 'edit';
            ams.resources.previewRes.fields.value = {
                type: 'text',
                label: '字段值',
                ctx: 'view'
            };
            const viewData = this.copy(data);
            let defaultData = viewData.default;
            // 三个特殊字段的需要特殊处理
            if (viewData.type === 'object' && viewData.fields) {
                let newDefaultData = {};
                Object.keys(viewData.fields).forEach(item => {
                    viewData.fields[item].ctx = 'view';
                    newDefaultData[item] = viewData.fields[item].default;
                });
                if (!defaultData) {
                    defaultData = newDefaultData;
                }
            } else if (viewData.type === 'array' && viewData.field) {
                viewData.field.ctx = 'view';
                if (!defaultData) {
                    defaultData = [];
                }
            } else if (viewData.type === 'union' && viewData.current && viewData.fields) {
                viewData.fields[viewData.current].ctx = 'view';
                if (!defaultData) {
                    defaultData = viewData.fields[viewData.current].default;
                }
            }
            ams.resources.previewRes.fields.view = viewData;
            ams.resources.previewRes.fields.view.ctx = 'view';
            console.log(ams.resources.previewRes);
            // ams.resource('previewRes', ams.resources.previewRes)

            // 清空 ctx
            ams.$blocks.form.initBlock();
            this.$set(ams.$blocks.form.data, 'edit', defaultData);
            this.$set(ams.$blocks.form.data, 'value', JSON.stringify(defaultData));
            this.$set(ams.$blocks.form.data, 'view', defaultData);
            ams.$blocks.list.initBlock();
            ams.$blocks.list.data.list.forEach(item => { item.view = defaultData });
            this.$set(ams.$blocks.list.data, 'list', this.copy(ams.$blocks.list.data.list));
        },
    }
};
</script>
