<template>
  <div v-if="ready" :style="block.style" class="ams-block-steps">
    <el-steps :active="data.active" finish-status="success" v-bind="block.props">
      <el-step
        v-for="name in block.blocks"
        :key="name"
        :name="name"
        :title="block.options[name] && block.options[name].title || block.options[name]"
        :description="block.options[name] && block.options[name].description" />
    </el-steps>
    <template v-for="(name, index) in block.blocks">
      <ams-block
        v-if="data.active === index"
        :key="index"
        :name="block.blocks[index]" />
    </template>
    <ams-operations
      :operations="block.operations"
      :name="name"
      class="batch-operations"/>
  </div>
</template>
<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>
