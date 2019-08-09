<template>
    <div :style="field.style">{{ actualViewText }}<el-popover v-if="showMoreIcon"
                    :placement="field.collapsePlacement || 'right'"
                    :title="field.collapseTitle || ''"
                    :width="field.collapseWidth || 200"
                    trigger="hover"
                    :content="viewText">
            <span slot="reference">... <el-tag size="mini" type="info">...</el-tag></span>
        </el-popover></div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    computed: {
        viewText() {
            return this.viewValue == null ? '' : String(this.viewValue);
        },
        showOptionsLimit() {
            const limit = this.field.collapseLimit;
            if (limit) {
                return typeof limit === 'number' ? limit : 1;
            }
            return this.viewText.length;
        },
        showMoreIcon() {
            return this.field.collapseLimit && this.viewText.length > this.showOptionsLimit;
        },
        actualViewText() {
            if (this.showMoreIcon) {
                return this.viewText.slice(0, this.showOptionsLimit);
            }
            return this.viewText;
        }
    }
};
</script>
