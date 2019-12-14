<template>
  <div v-if="ready" :style="block.style" class="ams-block-tabs" v-loading="loading">
    <el-tabs v-model="data.active" v-on="on" v-bind="block.props">
      <el-tab-pane
        v-for="(option, name) in block.options"
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
import { addEvent, debounce } from '../../utils/index';

export default {
    mixins: [mixins.blockMixin],
    methods: {
        afterReady() {
            // data.active 默认值为 '0'，如没有设置 active 默认选中每一个
            let options = [];
            if (this.block.options) {
                options = Object.keys(this.block.options);
            }

            if (this.data.active === '0' && options.length) {
                this.data.active = this.block.blocks[0];
            }

            // 在窗口resize时，部分情况下tabs选中态的下标异常，需要重设数据解决
            this.events.push(addEvent(window, 'resize', debounce(() => {
                this.setBlockData({});
            }, 100)));
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

