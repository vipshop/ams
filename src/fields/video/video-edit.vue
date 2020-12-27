<template>
    <el-upload :on-remove="handleRemove"
               :on-success="handleUploadSuccess"
               :on-error="handleUploadError"
               :before-upload="beforeUpload"
               :file-list="localValue"
               v-on="on"
               :style="field.style"
               v-bind="field.props"
               ref="videoUploder">
        <el-button :size="field.props['size']"
                   :disabled="field.props['disabled']"
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
            return new Promise(async (resolve, reject) => {
                if (!this.field.check) {
                    return resolve();
                }

                let { maxSizeInKB } = this.field.check;
                if (maxSizeInKB && (file.size / 1024) > maxSizeInKB) {
                    this.$message.error('上传视频大小不能超过 ' + (maxSizeInKB / 1024).toFixed(2) + 'MB!');
                    return reject(); // eslint-disable-line prefer-promise-reject-errors
                }
                const props = this.field.props || {};
                if (typeof props['before-upload'] === 'function') {
                    await props['before-upload'](file, this.field);
                }
                resolve();
            });
        },
        handleUploadSuccess(res, file) {
            const props = this.field.props || {};
            // todo: 预览、上传进度
            let successCode;
            if (props && typeof props.successCode !== 'undefined') {
                successCode = props.successCode;
            } else {
                successCode = this.$block.getConfig('resource.api.successCode');
            }
            if (res.code === successCode) {
                const successUrlKey = this.field.successUrlKey || 'url';
                if (res.data) {
                    this.localValue = this.field.get(res.data[successUrlKey] || res.data, this.field);
                }
                if (typeof props['on-success'] === 'function') {
                    props['on-success'](res, file, this);
                }
            } else if (typeof props['on-error'] === 'function') {
                this.handleRemove();
                props['on-error'](res, file, this);
            } else {
                this.$message.error(`${res.msg}(${res.code})`);
                this.handleRemove();
            }
        },
        handleUploadError(res, file, fileList) {
            const { props = {}} = this.field;

            if (typeof props['on-error'] === 'function') {
                props['on-error'](res, file, fileList, this);
            } else {
                this.$message.error(`${res.message}(${res.status})`);
            }
        },
        handleRemove() {
            // 清空数据
            this.localValue = [];
            // 清空已选下拉列表
            // @see {@link https://element.eleme.cn/#/zh-CN/component/upload#methods | Element UI Upload 上传组件}
            this.$refs.videoUploder.clearFiles();
        }
    }
};
</script>
