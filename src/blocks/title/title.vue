<template>
    <div v-if="ready"
         :style="block.style"
         v-bind="block.props"
         v-on="on"
         class="ams-block-title">
         <div class="ams-title">
            <span v-html="block.options.title"></span>
            <div class="sub-title" v-if="block.options.subTitle">{{block.options.subTitle}}</div>
            <el-tooltip effect="dark" placement="top" v-if="suffixInfo">
                <i :class="'el-icon-info ams-field-suffix-info ' + suffixInfoClass"></i>
                <div slot="content" v-html="suffixInfo"></div>
            </el-tooltip>
            <ams-blocks class="ams-blocks-inline" :blocks="block.slotBlocks.append" />
         </div>
        <ams-blocks :blocks="block.blocks" />
        <ams-operations :name="name" />
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    data() {
        return {
            suffixInfoClass: ''
        };
    },
    computed: {
        suffixInfo() {
            const info = this.block.props['suffix-info'];
            const infoWarning = this.block.props['suffix-info-warning'];
            const infoDanger = this.block.props['suffix-info-danger'];
            if (infoWarning) {
                this.suffixInfoClass = 'warning';
            } else if (infoDanger) {
                this.suffixInfoClass = 'danger';
            } else {
                this.suffixInfoClass = '';
            }
            return info || infoWarning || infoDanger;
        }
    }
};
</script>
<style lang="scss">
.ams-block-title {
    font-size: 20px;
    .ams-title{
        border-left-width: 4px;
        border-left-style:  solid;
        color: #333;
        vertical-align: baseline;
        margin: 20px 0;
        padding-left: 12px;
        line-height: 1.3;
        .sub-title {
            color: #666;
            font-size: 12px;
            vertical-align: baseline;
            margin-left: 12px;
            display: inline-block;
        }
    }
}
</style>

