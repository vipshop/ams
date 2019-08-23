<template>
    <mavon-editor
        :style="field.style"
        :value="value"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="false"
        :boxShadow="false"
    ></mavon-editor>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin]
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
