<template>
  <div v-if="ready" :style="block.style" class="ams-block-steps">
    <el-steps :active="data.active" finish-status="success">
      <el-step v-for="name in block.blocks" :key="name" :name="name" :title="block.options[name]" />
    </el-steps>
    <ams-block
      v-for="(name, index) in block.blocks"
      v-if="data.active === index"
      :key="index"
      :name="block.blocks[index]" />
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
