<template>
<div v-if="ready" class="ams-block-carousel">
  <el-carousel :height="height" v-on="on" v-bind="block.props" :style="block.style" :ref="`amsCarousel`">
    <template v-if="block.props['item-type'] === 'block'">
      <el-carousel-item v-for="(name, key) in block.blocks" :key="key">
        <ams-block :name="name" />
      </el-carousel-item>
    </template>
    <template v-else>
      <el-carousel-item v-for="(value, key) in block.options" :key="key" :style="{'line-height': height}">
        {{ value}}
      </el-carousel-item>
    </template>
  </el-carousel>
  <ams-operations :name="name" v-if="block.operationsCounts.operations" class="operations" />
</div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        height() {
            const block = this.block;
            if (block.style && block.style.height) return block.style.height;
            if (block.props && block.props.height) return block.props.height;
            return '150px';
        }
    },
    methods: {
        setActiveItem(itemName) {
            return this.$refs.amsCarousel.setActiveItem(itemName);
        },
        next() {
            return this.$refs.amsCarousel.next();
        },
        prev() {
            return this.$refs.amsCarousel.prev();
        }
    }
};
</script>
<style lang="scss">
.ams-block-carousel {
    .el-carousel__item {
        color: #475669;
        font-size: 16px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        text-align: center;
    }
    .operations {
        margin-top: 8px;
    }
}
</style>

