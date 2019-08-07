<template>
    <div>
        <input type="file"
               ref="inputFile"
               @change="willPreviewFiles"
               :style="field.style"
               v-bind="field.props" />
        <el-button type="button"
                   size="mini"
                   v-if="field.isShowResetButton !== false"
                   @click="willResetUploadFiles">移除</el-button>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    methods: {
        willPreviewFiles(event) {
            this.localValue = event.target.files[0];
            // console.log('file', event.target.files[0]);
        },
        willResetUploadFiles() {
            this.localValue = '';
            this.$refs.inputFile.value = '';
        }
    }
};
</script>

<style lang="css">
.ams-field-simple-upload-file-edit .el-input__inner {
    padding-left: 0;
    line-height: 32px;
}
</style>
