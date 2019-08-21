<template>
    <div v-if="ready"
         class="ams-block-collapse"
         :style="block.style">
        <el-collapse v-model="data.active" v-on="on" :accordion="block.props.accordion || false">
            <template v-for="(value, key) in block.options">
                    <el-collapse-item :key="key" :name="key">
                        <template slot="title">
                            <span v-html="value"></span>
                        </template>
                        <ams-block :name="key" v-if="(typeof data.active !== 'undefined') && (isAccordion ? data.active === key : data.active.indexOf(key) >= 0)"/>
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

export default {
    mixins: [mixins.blockMixin],
    computed: {
        isAccordion() {
            return this.block.props && this.block.props.accordion;
        }
    }
};
</script>
