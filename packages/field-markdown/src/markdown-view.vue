<template>
    <mavon-editor
        :style="field.style"
        :value="xssValue"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="false"
        :boxShadow="false"
        v-bind="field.props"
    ></mavon-editor>
</template>

<script>
import ams from '@ams-team/ams';
import xss from 'xss';

export default {
    mixins: [ams.mixins.fieldViewMixin],
    computed: {
        xssValue: function() {
            const props = this.field.props || {};
            if (props.xss) {
                return xss(this.value);
            }
            return this.value;
        }
    }
};
</script>

<style lang="scss">
.ams-field-markdown-view{
    // border: 1px solid #d9d9d9;
    &.v-note-wrapper{
        background: transparent;
        .v-note-panel{
            border: 0;
        }
        .v-note-panel .v-note-show .v-show-content, .v-note-panel .v-note-show .v-show-content-html{
            background: transparent;
            padding: 0;
        }
    }
}
</style>
