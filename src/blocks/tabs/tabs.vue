<template>
  <div v-if="ready" :style="block.style" class="ams-block-tabs">
    <el-tabs v-model="data.active" v-on="on" v-bind="block.props">
      <el-tab-pane
        v-for="name in showBlocks"
        :key="name"
        :name="name"
        v-bind="typeof block.options[name] !== 'string' && block.options[name]">
        <span slot="label" v-html="typeof block.options[name] === 'string' ? block.options[name] : block.options[name]['label']"></span>
        <ams-block :name="name" />
      </el-tab-pane>
    </el-tabs>
    <span v-if="block.operationsCounts.operations" class="operations" >
      <ams-operations :name="name" />
    </span>
  </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    computed: {
        showBlocks() {
            const options = this.block.options;
            if (options && Object.keys(options).length) {
                return Object.keys(options);
            }
            return [];
        }
    },
    methods: {
        afterReady() {
            // data.active 默认值为 '0'，如没有设置 active 默认选中每一个
            if (this.data.active === '0' && this.showBlocks.length) {
                this.data.active = this.block.blocks[0];
            }
        }
    }
};
</script>
<style lang="scss">
.ams-block-tabs {
  position: relative;
  padding-left: 15px;
  > .operations {
    position: absolute;
    top: 0;
    right: 0;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>

