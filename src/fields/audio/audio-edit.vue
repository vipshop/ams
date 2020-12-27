<template>
<div>
    <el-upload :on-remove="handleRemove"
               :on-success="handleUploadSuccess"
               :before-upload="beforeUpload"
               :file-list="localValue"
               :style="field.style"
               v-on="on"
               v-bind="field.props">
        <el-button :size="field.props['size']"
                   :disabled="field.props['disabled']"
                   type="primary">{{ field.props && field.props['button-label'] || '点击上传'}}</el-button>
        <div slot="tip"
             class="el-upload__tip"
             v-if="field.tip">{{field.tip}}</div>
    </el-upload>
</div>
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
                    this.$message.error('上传音频大小不能超过 ' + (maxSizeInKB / 1024).toFixed(2) + 'MB!');
                    return reject(); // eslint-disable-line prefer-promise-reject-errors
                }
                const props = this.field.props || {};
                if (typeof props['before-upload'] === 'function') {
                    await props['before-upload'](file);
                }
                resolve();
            });
        },
        handleUploadSuccess(res, file) {
            console.log('handleUploadSuccess', res, file);
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
                    props['on-success'](res, file);
                }
            } else if (typeof props['on-error'] === 'function') {
                props['on-error'](res, file);
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
