<template>
    <div :style="field.style">
        <quill-editor ref="myQuillEditor"
                      v-model="localValue"
                      :options="editorOptions"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"></quill-editor>

    </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            fullscreenLoading: false,
            editorOptions: {
                // modules: {
                //     ImageExtend: {
                //         loading: true,
                //         name: 'img',
                //         action: updateUrl,
                //         response: (res) => {
                //             return res.info
                //         }
                //     },
                //     toolbar: {
                //         container: container,
                //         handlers: {
                //             'image': function () {
                //                 QuillWatch.emit(this.quill.id)
                //             }
                //         }
                //     }
                // }
            }
        };
    },
    methods: {
        onEditorChange() {
            console.log('onEditorChange');
            // 内容改变事件
            // this.localValue = `<div class="ql-container ql-snow"><div class="ql-editor">${this.localValue}</div></div>`;
        },

        onEditorBlur() {
            // 失去焦点事件
            console.log('onEditorBlur');
        },
        onEditorFocus() {
            // 获得焦点事件
            console.log('onEditorFocus');
        }
    }
};
</script>

<style lang="scss">
.ams-field-editor-edit {
    .quill-editor{
        .ql-snow .ql-picker-label::before{
            vertical-align: top;
        }
        .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg{
            vertical-align: top;
        }
        .ql-container{
            max-height: 1000px;
            min-height: 300px;
            overflow-y: auto;
        }
    }
}
</style>
