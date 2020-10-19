<template>
    <div :style="field.style" :class="handleClassName">
        <el-upload :on-success="handleUploadSuccess"
                   :before-upload="beforeUpload"
                   v-on="on"
                   v-bind="field.props">
            <el-image
                v-if="localValue"
                :src="localValue"
                :fit="field.props && field.props.fit"></el-image>
            <i v-else
               class="el-icon-plus"></i>
            <p class="edit-text"
               v-show="localValue">修改</p>
        </el-upload>
        <i class="el-icon-error"
           v-show="localValue"
           @click="handleRemove"></i>
        <div slot="tip"
             class="el-upload__tip"
             v-if="field.tip">{{field.tip}}</div>

        <template v-if="field.props['default-image-list']">
            可供选择的图片有：
            <ul v-if="field.props['default-image-list'].length" class="el-upload-list el-upload-list--picture-card el-default-list--picture-card">
                <li
                    :class="`el-upload-list__item ${localValue === item.url ? 'is-success' : ''}`"
                    v-for="(item, index) in field.props['default-image-list']"
                    :key="index"
                    @click="handleChoseFromList(item.url)"
                    :title="item.name">
                    <el-image
                        :src="item.url"
                        :fit="field.props && field.props.fit"
                        class="el-upload-list__item-thumbnail"></el-image>
                    <span class="el-upload-list__item-name">{{item.name}}</span>
                    <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label>
                </li>
            </ul>
            <div v-else class="red">暂无图片可选，请自行上传！</div>
        </template>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    computed: {
        handleClassName() {
            // 头像场景
            let className = {
                'ams-field-headimage': this.field.props.headimage
            };

            // 将配置的 `fit` 参值换成对应的类名，用以入侵 element ui upload
            // 组件列表场景中，列表图片不可控的问题。
            // https://element.eleme.cn/#/en-US/component/upload#filelist-with-thumbnail
            // 对应控制的图片场景如下：
            // https://element.eleme.cn/#/en-US/component/image#basic-usage
            if (this.field.props.fit) {
                className[`ams-field-image-fit-${this.field.props.fit}`] = true;
            }

            return className;
        }
    },
    methods: {
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                if (!this.field.check) {
                    return resolve();
                }
                const props = this.field.props || {};

                let { maxSizeInKB, imgMaxWidth, imgMaxHeight, imgMinWidth, imgMinHeight, imgWidth, imgHeight } = this.field.check;
                if (maxSizeInKB && (file.size / 1024) > maxSizeInKB) {
                    this.$message.error('上传图片大小不能超过 ' + (maxSizeInKB / 1024).toFixed(2) + 'MB!');
                    return reject(); // eslint-disable-line prefer-promise-reject-errors
                }

                if (imgMaxWidth || imgMaxHeight || imgMinWidth || imgMinHeight || imgWidth || imgHeight) {
                    let image = new Image();
                    image.onload = async () => {
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
                            if (typeof props['before-upload'] === 'function') {
                                resolve(props['before-upload'](file));
                            }
                        } else {
                            reject(); // eslint-disable-line prefer-promise-reject-errors
                        }
                    };
                    image.src = URL.createObjectURL(file);
                } else {
                    if (typeof props['before-upload'] === 'function') {
                        resolve(props['before-upload'](file));
                    }
                    resolve();
                }
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
                    // this.previewUrl = URL.createObjectURL(file.raw);
                    this.localValue = res.data[successUrlKey] || res.data;
                    window.test = this.$refs.upload;

                    this.emitFormItemChange();
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
        },
        handleChoseFromList(url) {
            this.localValue = url;
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
        line-height: 100px;
        overflow: hidden;
        &:hover {
            .edit-text {
                display: block;
            }
        }
        &.el-upload--picture-card{
            position: absolute;
            top: 0;
        }
        .el-image {
            width: 100px;
            height: 100px;
        }
    }
    .el-upload-list--picture-card{
        display: block;
        padding-top: 110px;
        line-height: 0;
        .el-upload-list__item,
        .el-image {
            width: 100px;
            height: 100px;
        }
        &.el-default-list--picture-card{
            padding-top: 0;
            max-height: 240px;
            overflow-y: auto;
            .el-upload-list__item {
                cursor: pointer;
                &:hover {
                    .el-upload-list__item-status-label {
                        display: block;
                    }
                }
            }
            .el-upload-list__item-name{
                display: block;
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff;
                text-align: center;
                font-size: 12px;
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
    .edit-text {
        width: 100%;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0;
        display: none;
    }
    .red{
        color: #c00;
    }
}
.ams-field-headimage {
    .el-upload {
        border-radius: 50%;
    }
    .el-icon-error {
        top: 15px;
        left: 85px;
    }
}

.ams-field-image-fit-fill .el-upload-list .el-upload-list__item-thumbnail {
    object-fit: fill;
}
.ams-field-image-fit-contain .el-upload-list .el-upload-list__item-thumbnail {
    object-fit: contain;
}
.ams-field-image-fit-cover .el-upload-list .el-upload-list__item-thumbnail {
    object-fit: cover;
}
.ams-field-image-fit-none .el-upload-list .el-upload-list__item-thumbnail {
    object-fit: none;
}
.ams-field-image-fit-scale-down .el-upload-list .el-upload-list__item-thumbnail {
    object-fit: scale-down;
}
</style>
