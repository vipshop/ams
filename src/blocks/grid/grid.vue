<template>
    <div v-if="ready"
        class="ams-block-grid"
        :style="gridStyle"
        v-on="on"
        v-bind="block.props" >
        <ams-block class="ams-block-grid-item" v-for="n in block.blocks" :key="n" :name="n" />
    </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        gridStyle() {
            let style = {
                'grid-gap': '20px 20px' // 默认间隔
            };
            const blocksLen = this.block.blocks && Object.keys(this.block.blocks).length;
            if (blocksLen) {
                style['grid-template-columns'] = `repeat(${blocksLen}, 1fr)`; // 默认是一行n列平分
            }
            return {
                ...style,
                ...this.block.style
            };
        }
    },
};
</script>

<style lang="scss">
.ams-block-grid{
    > * {
        display: inline-block;
        vertical-align: top;
    }
}
@supports (display: grid) {
    .ams-block-grid {
        display: grid;
        > * {
            width: auto!important;
            margin: 0!important;
        }
    }
}
</style>
