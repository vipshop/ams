<template>
    <div :style="field.style">
        {{actualSelectOptionsText}}
        <el-popover v-if="showMoreIcon"
                    :placement="field.collapsePlacement || 'right'"
                    :title="field.collapseTitle || ''"
                    :width="field.collapseWidth || 200"
                    trigger="hover"
                    :content="selectOptionsPlainText">
            <span slot="reference">... <el-tag size="mini" type="info">共{{ selectOptions.length }}项<i class="el-icon-arrow-right"></i></el-tag></span>
        </el-popover>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin, mixins.fieldViewOptionsMixin]
};
</script>
