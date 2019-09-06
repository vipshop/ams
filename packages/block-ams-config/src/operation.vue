<template>
    <div class="ams-config-content">
        <ams-block name="$ams-config-edit" v-if="editBlockReady" class="edit"></ams-block>
        <div class="preview">
            <ams-block name="$ams-preview-titleBlock" v-if="previewCodeReady" ></ams-block>
            <ams-block name="$ams-preview-block" v-if="previewReady" ></ams-block>
            <br/>
            <ams-block name="$ams-config-preview" v-if="previewCodeReady" ></ams-block>
        </div>
        <args :config="config"/>
    </div>
</template>

<script>
/* eslint-disable max-depth,no-undefined */
import ams from '@ams-team/ams';
// import beautify from 'js-beautify';
// import stringify from '@ams-team/json-stringify';
import mixin from './mixin';
import args from './args';

export default {
    components: {
        args
    },
    mixins: [mixin],
    data() {
        return {
            previewReady: false
        };
    },
    methods: {
        initPreviewBlock() {
            let _this = this;
            // 常用配置
            const previewTitle = {
                blocks: {
                    // normalTitle: null,
                    editTitle: {
                        type: 'title',
                        options: {
                            title: '效果预览'
                        }
                    }
                }
            };
            const previewBlock = {
                blocks: {
                    // normalTitle: null,
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
                                            console.log('change code', code);
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
                    }
                }
            };
            // const keys = this.defaults ? Object.keys(this.defaults) : [];
            // const normalTitle = {
            //     type: 'title',
            //     options: {
            //         title: '常用配置'
            //     },
            //     operations: {},
            //     events: {
            //         reset: '@$ams-config-edit.resetData'
            //     },
            //     actions: {
            //         select({ $arg }) {
            //             // console.log('_this.defaults[$args]', _this.defaults, $arg);
            //             ams.$blocks.codeForm.data.code = beautify(stringify(_this.defaults[$arg]), { indent_size: 2, space_in_empty_paren: true });
            //         }
            //     },
            // };
            // keys.forEach(key => {
            //     normalTitle.operations[key] = {
            //         type: 'button',
            //         label: key,
            //         props: {
            //             type: 'primary',
            //             plain: true
            //         },
            //         event: `select:${key}`
            //     };
            // });
            // normalTitle.operations.reset = {
            //     type: 'button',
            //     label: '重置'
            // };
            // previewBlock.blocks.normalTitle = normalTitle;
            ams.block('$ams-preview-titleBlock', previewTitle);
            ams.block('$ams-config-preview', previewBlock);
            this.previewCodeReady = true;
        },
        updatePreview(data) {
            this.previewReady = false;
            let opera = this.copy(data);
            let eventName = opera.event || 'test';
            delete opera.event;
            ams.block('$ams-preview-block', {
                type: 'component',
                resource: 'demo',
                options: {
                    is: 'div',
                    html: '<div id="opera-log">请点击下方operation ~</div>'
                },
                actions: {
                    click({ $arg, $prevReturn }) {
                        let log = document.querySelector('#opera-log');
                        if (log) {
                            log.innerHTML = `触发了${eventName}事件，参数为: ${JSON.stringify({ $arg, $prevReturn })}`;
                        }
                    },
                    fieldChange({ path, value }) {
                        let log = document.querySelector('#opera-log');
                        if (log) {
                            log.innerHTML = `触发了fieldChange事件，参数为: ${JSON.stringify({ path, value })}`;
                        }
                    }
                },
                operations: {
                    click: opera
                }
            });
            setTimeout(() => {
                this.previewReady = true;
            }, 0);
        },
    }
};
</script>

<style lang="scss">
#opera-log{
    width: 100%;
    height: 60px;
    border-radius: 5px;
    background-color: #eee;
    line-height: 1.6em;
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    margin-bottom: 10px;
    color: #222;
    overflow: auto;
}
</style>

