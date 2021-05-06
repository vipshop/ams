<template>
    <div :style="field.style">
        <quill-editor
            ref="myQuillEditor"
            v-model="localValue"
            v-bind="field.props"
            v-on="on"
        />
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
        };
    },
};
</script>

<style lang="scss">
.ams-field-editor-edit {
    .quill-editor {
        .ql-snow .ql-picker-label::before {
            vertical-align: top;
        }
        .ql-snow .ql-color-picker .ql-picker-label svg,
        .ql-snow .ql-icon-picker .ql-picker-label svg {
            vertical-align: top;
        }
        .ql-container {
            max-height: 1000px;
            min-height: 300px;
            overflow-y: auto;
        }
    }
}
</style>
