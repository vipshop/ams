<template>
    <div v-if="ready"
         class="ams-block-collapse"
         :style="block.style">
        <el-collapse v-model="data.active" v-on="on" :accordion="block.props.accordion || false">
            <template v-for="(option, key) in block.options">
                    <el-collapse-item :key="key" :name="key">

                        <template slot="title">
                            <div class="ams-block-collapse-title" v-html="typeof option === 'string' ? option : option['title']"></div>
                        </template>
                         <!-- <ams-block :name="key" v-if="(typeof data.active !== 'undefined') && (isAccordion ? data.active === key : data.active.indexOf(key) >= 0)"/> -->
                        <CollapsePane :name="key" :active="data.active" :option="option"/>

                    </el-collapse-item>
            </template>
        </el-collapse>
        <ams-operations
        :operations="block.operations"
        :name="name"
        class="operations"/>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import CollapsePane from './collapse-pane.vue';

export default {
    components: {
        CollapsePane
    },
    mixins: [mixins.blockMixin],
    computed: {
        isAccordion() {
            return this.block.props && this.block.props.accordion;
        }
    }
};
</script>
<style>
.ams-block-collapse-title {
    width: 100%;
}
</style>

