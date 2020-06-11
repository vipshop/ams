<template>
  <div :style="field.style" class="ams-options-view">
    {{actualSelectOptionsText}}
    <el-popover
      v-if="showMoreIcon"
      :placement="field.collapsePlacement || 'bottom-end'"
      :title="field.collapseTitle || ''"
      :width="field.collapseWidth || 200"
      trigger="hover"
    >
      <span slot="reference">
        ...
        <el-tag size="mini" type="info">
          +{{ selectOptions.length - showOptionsLimit }}
        </el-tag>
      </span>
      <ul class="el-scrollbar__view el-select-dropdown__list ams-popover-content-view">
        <li class="el-select-dropdown__item" v-for="option in dropdownOptions">
            <span>{{option}}</span>
        </li>
      </ul>
    </el-popover>
  </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin, mixins.fieldViewOptionsMixin]
};
</script>

<style lang="scss">
.ams-popover-content-view {
    max-height: 300px;
    overflow: auto;
}
</style>

