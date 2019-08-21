<template>
    <div v-if="ready" class="ams-block-backtop">
        <el-backtop v-bind="props" v-on="on" :style="block.style" :ref="`amsBacktop`">
            <template v-if="block.blocks">
                <ams-block :name="name" v-for="(name, key) in block.blocks" :key="key" />
            </template>
        </el-backtop>
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        props() {
            if (this.block && this.block.props) {
                return this.block.props;
            }
            return {};
        }
    }
};
</script>

