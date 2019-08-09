<template>
    <div :style="field.style">
        <el-upload :show-file-list="false"
                   :on-success="handleUploadSuccess"
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
        handleUploadSuccess(res, file) {
            console.log('handleUploadSuccess', res, file);
            // todo: 预览、上传进度
            const successCode = this.$block.getConfig('resource.api.successCode');
            if (res.code === successCode) {
                const successUrlKey = this.field.successUrlKey || 'url';
                if (res.data && res.data[successUrlKey]) {
                    this.previewUrl = URL.createObjectURL(file.raw);
                    this.localValue = res.data[successUrlKey];
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
        }
    }
};
</script>

<style lang="scss">
.ams-field-headimage-edit {
    position: relative;
    cursor: pointer;
    .el-upload {
        display: block;
        border: 1px solid #d9d9d9;
        border-radius: 50%;
        position: relative;
        width: 100px;
        height: 100px;
        line-height: 100px;
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
        width: 15px;
        height: 15px;
        position: absolute;
        top: 15px;
        left: 85px;
        margin: -8px 0 0 -8px;
        z-index: 1;
        opacity: 0.7;
        &:hover {
            color: #c00;
        }
    }
    img {
        width: 100%;
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
