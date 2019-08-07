<template>
    <div v-if="ready"
         :style="block.style"
         class="ams-block-title">
         <div class="ams-title">
        {{block.options.title}}<div class="sub-title">{{block.options.subTitle}}</div>
         </div>
        <ams-blocks :blocks="block.blocks" />
        <ams-operations :name="name" />
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>
<style lang="scss">
.ams-block-title {
    .ams-title{
        border-left: 4px solid #409EFF;
        font-size: 20px;
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

