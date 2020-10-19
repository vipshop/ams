<template>
    <figure :class="imageItemClass" @click="$emit('clickImageItem', $event)">
        <div :class="`list-item-con ${imageSrc ? 'is-image' : ''}`">
            <img v-if="imageSrc" :src="imageSrc" class="el-image__inner">
            <div v-else-if="imageText" class="list-item-con-text">{{imageText}}</div>
            <div class="list-item-topright-operations">
                 <ams-operations :name="name"
                        :context="image"></ams-operations>
             </div>
            <div :class="subtitleClass" v-if="subtitle">{{subtitle}}</div>
            <div class="list-item-subscript" v-if="subscript">{{subscript}}</div>
        </div>
        <figcaption v-if="title || info">
            <div class="s-left">
                <el-checkbox v-if="showCheckbox" v-model="isSelect" :key="index" @change="$emit('selectionChange')" ></el-checkbox>

                <span class="s-left-prefix" v-if="titlePrefixIcon" v-html="titlePrefixIcon">
                </span>
                <el-tag size="small" v-else-if="titlePrefixTag" :type="titlePrefixTag.type">{{titlePrefixTag.label}}</el-tag>
                {{title}}
            </div>
            <div class="s-right" v-if="info" v-html="info"></div>
        </figcaption>
    </figure>
</template>
<script>
export default {
    props: {
        image: {
            type: Object,
            default: {},
            required: true
        },
        name: {
            type: String,
            default: '',
            required: true
        },
        block: {
            type: Object,
            default: {},
            required: true
        },
        index: {
            type: Number,
            default: null,
            required: true
        },
        showCheckbox: {
            type: Boolean,
            default: false,
            required: true
        },
        batchSelected: {
            type: Array,
            default: [],
            required: true
        }
    },
    data() {
        return {
            isSelect: false
        };
    },
    computed: {
        imageItemClass() {
            let cla = `list-item`;
            if (this.block.props && this.block.props.shadow) {
                cla += `  is-${this.block.props.shadow}-shadow`;
            }
            return cla;
        },
        subtitleClass() {
            let cla = `list-item-subtitle`;
            if (this.block.props && this.block.props.subtitle) {
                cla += ` is-${this.block.props.subtitle}-subtitle`;
            }
            return cla;
        },
        imageSrc() {
            if (this.block.options && this.block.options.imageSrc && this.block.options.imageSrc.field) {
                return this.image[this.block.options.imageSrc.field];
            }
            return this.image['image'];
        },
        imageText() {
            if (this.block.options && this.block.options.imageText && this.block.options.imageText.field) {
                return this.image[this.block.options.imageText.field];
            }
            return this.image['imageText'];
        },
        title() {
            if (this.block.options && typeof this.block.options.title !== 'undefined') {
                if (this.block.options.title.field) {
                    return this.image[this.block.options.title.field];
                } else if (typeof this.block.options.title === 'function') {
                    return this.block.options.title(this.image);
                }
                return this.block.options.title;
            }
            return this.image['title'];
        },
        titlePrefixIcon() {
            if (this.block.options && this.block.options.title) {
                const icon = this.block.options.title['prefix-icon'];
                if (icon) {
                    return `<i class="${icon}"></i>`;
                }
            }
            return '';
        },
        titlePrefixTag() {
            if (this.block.options && this.block.options.title) {
                const tag = this.block.options.title['prefix-tag'];
                const tagType = tag.type || '';
                const tagLabel = tag.label ? tag.label(this.image) : '';
                return {
                    type: tagType,
                    label: tagLabel
                };
            }
            return null;
        },
        subtitle() {
            if (this.block.options && this.block.options.subtitle && this.block.options.subtitle.field) {
                return this.image[this.block.options.subtitle.field];
            }
            return this.image['subtitle'];
        },
        info() {
            if (this.block.options && typeof this.block.options.info !== 'undefined') {
                if (this.block.options.info.field) {
                    return this.image[this.block.options.info.field];
                }
                return this.block.options.info;
            }
            return this.image['info'];
        },
        subscript() {
            if (this.block.options && typeof this.block.options.subscript !== 'undefined') {
                if (this.block.options.subscript.field) {
                    return this.image[this.block.options.subscript.field];
                }
                return this.block.options.subscript;
            }
            return this.image['subscript'];
        }
    },
    watch: {
        batchSelected(n) {
            if (JSON.stringify(n).indexOf(JSON.stringify(this.image)) > -1) {
                this.isSelect = true;
            } else {
                this.isSelect = false;
            }
        }
    }
};
</script>
<style lang="scss">
.list-item{
    float: left;
    margin: 12px;
    width: 22.7%;
    min-width: 200px;
    max-width: 280px;
    border: 1px solid #EBEEF5;
    cursor: pointer;
    // &:nth-child(4n) {
    //     margin-right: 0;
    // }
    // &:last-child:nth-child(4n - 2) {
    //     margin-right: calc(48% + 8% / 3);
    // }
    &.is-always-shadow,&.is-hover-shadow:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
    &-con{
        width: 100%;
        position: relative;
        z-index: 1;
        height: 120px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        &-text{
            padding: 10px;
            line-height: 24px;
            word-break: break-all;
        }
        .list-item-subtitle {
            padding:5px 10px;
            box-sizing: border-box;
            position: absolute;
            z-index: 2;
            bottom: 0;
            left: 0;
            width: 100%;
            color: #fff;
            font-size: 12px;
            line-height: 18px;
            max-height: 44px;
            overflow: hidden;
            text-overflow: ellipsis;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            transition: ease 0.3s;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            &.is-hover-subtitle{
                transform: translateY(10%);
            }
        }
        .list-item-topright-operations{
            padding-top: 8px;
            text-align: right;
            position: absolute;
            z-index: 2;
            top: 0;
            right: 0;
            transform: translateY(-10%);
            transition: ease 0.3s;
            opacity: 0;
            .el-form--inline .el-form-item{
                margin-right: 5px;
            }
            .ams-operations .el-form-item__content{
                line-height: initial;
            }
            .icon,.ams-operation-text {
                border: 1px solid transparent;
            }
            .el-button,.icon,.ams-operation-text{
                color: #fff;
                display: inline-block;
                vertical-align: top;
                padding: 0 5px;
                font-size: 12px;
                line-height: 20px;
                border-radius: 3px;
                background-color: rgba(0, 0, 0, 0.5);
                &:hover{
                    background-color: rgba(0, 0, 0, 0.8);
                }
                &.ams-operation-text--primary{
                    color: #409eff;
                }
                &.ams-operation-text--success{
                    color: #67c23a;
                }
                &.ams-operation-text--info{
                    color: #909399;
                }
                &.ams-operation-text--danger{
                    color: #f56c6c;
                }
                &.is-disabled{
                    opacity: 0.6;
                    background-color: rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
    .is-image{
        height: 155px;
    }
    img{
        object-fit: cover;
    }
    figcaption{
        padding:10px;
        font-size: 12px;
        display: flex;
        line-height: 24px;
        height: 45px;
        .s-left{
            flex: 1;
            height: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .el-checkbox{
                margin-right: 5px;
            }
        }
        .s-right{
            padding-left: 10px;
        }
    }
    &:hover{
        .is-hover-subtitle,.list-item-topright-operations{
            transform: translateY(0);
            opacity: 1;
        }
    }
    &-subscript {
        position: absolute;
        z-index: 10;
        right: 0;
        bottom: 0;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 7px;
        line-height: 18px;
        font-size: 12px;
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>