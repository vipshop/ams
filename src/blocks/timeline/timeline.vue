<template>
    <div v-if="ready" :style="block.style" class="ams-block-timeline" v-loading="loading">
        <ams-operations :name="name"
                        slot-name="header"></ams-operations>
        <el-timeline v-on="on" v-bind="block.props">
            <el-timeline-item
            v-for="(item, index) in block.data"
            :key="index"
            v-bind="item">
            <div v-html="item.content"></div>
            </el-timeline-item>
        </el-timeline>

        <ams-operations :name="name"
                        slot-name="footer"></ams-operations>
    </div>
</template>
<script>
import mixins from '../../ams/mixins';
export default {
    mixins: [mixins.blockMixin]
};
</script>