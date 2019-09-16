<template>
    <el-upload :on-remove="handleRemove"
               :on-success="handleUploadSuccess"
               :before-upload="beforeUpload"
               :file-list="localValue"
               v-on="on"
               :style="field.style"
               v-bind="field.props">
        <el-button size="small"
                   type="primary">{{ field.props && field.props['button-label'] || '点击上传'}}</el-button>
        <div slot="tip"
             class="el-upload__tip"
             v-if="field.tip">{{field.tip}}</div>
    </el-upload>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    methods: {
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                if (!this.field.check) {
                    return resolve();
                }

                let { maxSizeInKB } = this.field.check;
                if (maxSizeInKB && (file.size / 1024) > maxSizeInKB) {
                    this.$message.error('上传视频大小不能超过 ' + (maxSizeInKB / 1024).toFixed(2) + 'MB!');
                    return reject(); // eslint-disable-line prefer-promise-reject-errors
                }
                resolve();
            });
        },
        handleUploadSuccess(res, file) {
            console.log('handleUploadSuccess', res, file);
            // todo: 预览、上传进度
            const successCode = this.$block.getConfig('resource.api.successCode');
            if (res.code === successCode) {
                const successUrlKey = this.field.successUrlKey || 'url';
                if (res.data && res.data[successUrlKey]) {
                    this.localValue = this.field.get(res.data[successUrlKey], this.field);
                }
            } else {
                this.$message.error(`${res.msg}(${res.code})`);
            }
        },
        handleRemove() {
            // 清空预览url
            // 变更数据
            this.localValue = [];
        }
    }
};
</script>
