<template>
    <div :style="field.style">
        <el-upload :show-file-list="false"
                   :on-success="handleUploadSuccess"
                   :before-upload="beforeUpload"
                   v-on="on"
                   v-bind="field.props">
            <img v-if="imageUrl"
                 :src="imageUrl">
            <i v-else
               class="el-icon-plus"></i>
            <p class="edit-text"
               v-show="imageUrl">修改</p>
        </el-upload>
        <i class="el-icon-error"
           v-show="imageUrl"
           @click="handleRemove"></i>
        <div slot="tip"
             class="el-upload__tip"
             v-if="field.tip">{{field.tip}}</div>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    data() {
        return {
            previewUrl: ''
        };
    },
    computed: {
        imageUrl() {
            return this.localValue || this.previewUrl;
        }
    },
    methods: {
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                if (!this.field.check) {
                    return resolve();
                }

                let { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight } = this.field.check;

                if (maxSizeInKB && (file.size / 1024) > maxSizeInKB) {
                    this.$message.error('上传图片大小不能超过 ' + (maxSizeInKB / 1024).toFixed(2) + 'MB!');
                    return reject(); // eslint-disable-line prefer-promise-reject-errors
                }

                if (imgMaxWidth || imgMaxHeight || imgMinWidth || imgMinHeight || imgWidth || imgHeight) {
                    let image = new Image();
                    image.onload = () => {
                        let widthVaild = true;
                        let heightValid = true;

                        console.log(image.width, image.height);

                        if (imgMaxWidth && image.width > imgMaxWidth) {
                            widthVaild = false;
                            this.$message('图片宽度不能超过' + imgMaxWidth + 'px');
                        }

                        if (imgMaxHeight && image.height > imgMaxHeight) {
                            heightValid = false;
                            this.$message('图片高度不能超过' + imgMaxHeight + 'px');
                        }

                        if (imgMinWidth && image.width < imgMinWidth) {
                            widthVaild = false;
                            this.$message('图片宽度不能小于' + imgMinWidth + 'px');
                        }

                        if (imgMinHeight && image.height < imgMinHeight) {
                            heightValid = false;
                            this.$message('图片高度不能小于' + imgMinHeight + 'px');
                        }
                        if (imgWidth && image.width !== imgWidth) {
                            widthVaild = false;
                            this.$message('图片宽度必须为' + imgWidth + 'px');
                        }

                        if (imgHeight && image.height !== imgHeight) {
                            heightValid = false;
                            this.$message('图片高度必须为' + imgHeight + 'px');
                        }
                        if (widthVaild && heightValid) {
                            resolve();
                        } else {
                            reject(); // eslint-disable-line prefer-promise-reject-errors
                        }
                    };
                    image.src = URL.createObjectURL(file);
                } else {
                    resolve();
                }
            });
        },
        handleUploadSuccess(res, file) {
            console.log('handleUploadSuccess', res, file);
            // todo: 预览、上传进度
            const successCode = this.$block.getConfig('resource.api.successCode');
            if (res.code === successCode) {
                const successUrlKey = this.field.successUrlKey || 'url';
                if (res.data && res.data[successUrlKey]) {
                    this.previewUrl = URL.createObjectURL(file.raw);
                    this.localValue = res.data[successUrlKey];
                    window.test = this.$refs.upload;

                    this.emitFormItemChange();
                }
            } else {
                this.$message.error(`${res.msg}(${res.code})`);
            }
        },
        handleRemove() {
            // 清空预览url
            this.previewUrl = '';
            // 变更数据
            this.localValue = '';
            this.emitFormItemChange();

        },
        emitFormItemChange() {
            // todo：关注一下有可能element-ui会修复这个问题
            if (this.field.rules) {
                if (this.$parent && this.$parent.$options && this.$parent.$options.componentName) {
                    this.$parent.$emit('el.form.change', this.localValue);
                }
                // this.dispatch('ElFormItem', 'el.form.change', this.localValue);
            }
        }
    }
};
</script>

<style lang="scss">
.ams-field-image-edit {
    position: relative;
    .el-upload {
        display: block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        position: relative;
        cursor: pointer;
        width: 100px;
        height: 100px;
        overflow: hidden;
        &:hover {
            border-color: #409eff;
            .edit-text {
                display: block;
            }
        }
    }
    .el-icon-plus {
        font-size: 28px;
        color: #8c939d;
        line-height: 100px;
        text-align: center;
    }
    .el-icon-error {
        cursor: pointer;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        left: 100px;
        margin: -8px 0 0 -8px;
        z-index: 1;
        opacity: 0.7;
        &:hover {
            color: #c00;
        }
    }
    img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: block;
    }
    .edit-text {
        width: 100%;
        height: 24px;
        line-height: 24px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0;
        display: none;
    }
}
</style>
