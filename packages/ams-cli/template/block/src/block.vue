<template>
    <div v-if="ready"
         :style="block.style"
         class="ams-block-<%=name%>">
        {{block.options.title}}<div class="sub-title">{{block.options.subTitle}}</div>
        <ams-blocks :blocks="block.blocks" />
    </div>
</template>
<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.blockMixin]
};
</script>
<style lang="scss">
.ams-block-<%=name%> {
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
</style>

