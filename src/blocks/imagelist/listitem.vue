<template>
    <figure :class="imageItemClass" @click="$emit('clickImageItem')">
        <div :class="`list-item-con ${imageSrc ? 'is-image' : ''}`">
            <img v-if="imageSrc" :src="imageSrc" class="el-image__inner">
            <div class="list-item-topright-operations">
                 <ams-operations :name="name"
                        :context="image"></ams-operations>
             </div>
            <div :class="subtitleClass" v-if="subtitle">{{subtitle}}</div>
        </div>
        <figcaption>
            <div class="s-left">
                <span class="s-left-prefix" v-if="titlePrefixIcon" v-html="titlePrefixIcon">
                </span>
                <el-tag size="small" v-else-if="titlePrefixTag" :type="titlePrefixTag.type">{{titlePrefixTag.label}}</el-tag>
                {{title}}
            </div>
            <div class="s-right" v-if="info">{{info}}</div>
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
        }
    },
    data() {
        return {
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
        title() {
            if (this.block.options && this.block.options.title) {
                if (this.block.options.title.field) {
                    return this.image[this.block.options.title.field];
                }
                return this.block.options.title(this.image);
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
            if (this.block.options && this.block.options.info && this.block.options.info.field) {
                return this.image[this.block.options.info.field];
            }
            return this.image['info'];
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
    &.is-always-shadow,&.is-hover-shadow:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    }
    &-con{
        width: 100%;
        overflow: hidden;
        position: relative;
        z-index: 1;
        height: 120px;
        .list-item-subtitle {
            padding:5px 10px;
            line-height: 22px;
            box-sizing: border-box;
        }
        .list-item-topright-operations{
            padding-top: 8px;
            text-align: right;
            .el-form--inline .el-form-item{
                margin-right: 5px;
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
            }
        }
    }
    .is-image{
        height: 150px;
        .list-item-subtitle {
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
            &.is-hover-subtitle{
                transform: translateY(100%);
            }
        }
        .list-item-topright-operations{
            position: absolute;
            z-index: 2;
            top: 0;
            right: 0;
            transform: translateY(-100%);
            transition: ease 0.3s;
        }
    }
    img{
        object-fit: cover;
    }
    figcaption{
        padding:10px;
        font-size: 12px;
        display: flex;
        line-height: 24px;
        .s-left{
            flex: 1;
        }
        .s-right{
            padding-left: 10px;
        }
    }
    &:hover{
        .is-image .is-hover-subtitle,.list-item-topright-operations{
            transform: translateY(0);
        }
    }
}
</style>