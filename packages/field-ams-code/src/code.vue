<template>
    <div class="ams-code">
        <div ref="amsCode"
             class="ams-code-element"
             :style="field.style"
             v-bind="field.props">
        </div>
        <el-alert v-if="lintMsg"
                  :title="lintMsg"
                  type="warning"
                  @close="close">
        </el-alert>
    </div>
</template>

<script>
import ams from '@ams-team/ams';
import codeMirror from 'codemirror';
import jsBeautify from 'js-beautify';
import amsJSONStringify from '@ams-team/json-stringify';

/**
 * 导出到全局windows给其它依赖的模块使用，如block-ams-config，需要配置ex
 *
 */
window.codeMirror = codeMirror;
window.jsBeautify = jsBeautify;
window.amsJSONStringify = amsJSONStringify;

export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            editor: null,
            // timeHandler: null,
            lintMsg: ''
        };
    },
    watch: {
        value(val) {
            // console.log('watch value', val);
            // this.setEditorValue(val);
            this.editor.setValue(this.getValue(val));
        }
    },
    mounted() {
        // 初始化
        this.editor = codeMirror(this.$refs.amsCode, this.$ams.utils.deepExtend({
            indentUnit: 4,
            lineNumbers: true, // 是否显示行号
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'monokai',
            // 只读模式
            readOnly: this.field.ctx === 'view',
            lineWrapping: true // 是否强制换行
        }, this.field.codeMirrorOptions));
        // console.log(this.editor, this.value, this.localValue);
        // 默认为string，非string会转换成js表达式的值


        this.editor.setValue(this.getValue(this.value));
        // blur
        this.editor.on('change', (edit) => {
            let code = edit.getValue();
            try {
                // eslint-disable-next-line no-new-func
                (new Function(`return ${code}`))();
                if (this.on.change) {
                    this.on.change(code);
                }
                this.lintMsg = '';
            } catch (error) {
                this.lintMsg = String(error.message || error);
            }
        });
        this.editor.on('blur', (edit) => {
            // 加一个延时，有可能focus触发了，拿到的还是旧的值
            let code = edit.getValue();
            console.log('timeout code', code);

            if (this.field.ctx === 'edit') {
                // 默认为string，非string会转换成js表达式的值
                if (this.field.valueType === 'string') {
                    this.localValue = code;
                } else {
                    try {
                        // eslint-disable-next-line no-new-func
                        this.localValue = (new Function(`return ${code}`))();
                    } catch (error) {
                        console.warn('ams Err:', error);
                        this.lintMsg = String(error.message || error);
                        // eslint-disable-next-line no-undefined
                        this.localValue = undefined;
                    }
                }
            }
            if (this.on.blur) {
                this.on.blur(code);
            }
        });
        this.editor.on('focus', (edit) => {
            let code = edit.getValue();
            // console.log('code', code);
            if (this.on.focus) {
                this.on.focus(code);
            }
        });
    },
    methods: {
        close() {
            this.lintMsg = '';
        },
        getValue(val) {
            if (!val) {
                return '';
            }
            if (this.field.valueType === 'string') {
                return val;
            } else {
                return jsBeautify(amsJSONStringify(val), { indent_size: 2, space_in_empty_paren: true });
            }
        }
    }
};
</script>

<style lang="scss">
.ams-code {
    height: 100%;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.5;
    .ams-code-element{
        border-radius: 5px;
        overflow: hidden;
    }
    .el-alert {
        margin-top: 5px;
    }
}
</style>

