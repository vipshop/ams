<template>
    <div :style="field.style" v-bind="field.props" v-on="on">{{ actualViewText }}<el-popover v-if="showMoreIcon"
                    :placement="field.collapsePlacement || 'right'"
                    :title="field.collapseTitle || ''"
                    :width="field.collapseWidth || 200"
                    trigger="hover"
                    :content="viewText">
            <span slot="reference">... <el-tag size="mini" type="info">...</el-tag></span>
        </el-popover>
        <el-tooltip effect="dark" placement="top" v-if="suffixInfo">
            <i :class="suffixIcon + ' ams-field-suffix-info ' + suffixInfoClass"></i>
            <div slot="content" v-html="suffixInfo"></div>
        </el-tooltip>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    data() {
        return {
            suffixInfoClass: ''
        };
    },
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
        },
        suffixIcon() {
            return this.field.props && this.field.props['suffix-icon'] || 'el-icon-info';
        },
        suffixInfo() {
            const info = this.field.props['suffix-info'];
            const infoWarning = this.field.props['suffix-info-warning'];
            const infoDanger = this.field.props['suffix-info-danger'];
            if (infoWarning) {
                this.suffixInfoClass = 'warning';
            } else if (infoDanger) {
                this.suffixInfoClass = 'danger';
            } else {
                this.suffixInfoClass = '';
            }
            return info || infoWarning || infoDanger;
        }
    }
};
</script>
<style lang="scss">
.ams-field-suffix-info{
    margin-left: 5px;
    color: #999;
    &.warning{
        color: #F7A545;
    }
    &.danger{
        color: #F56C6C;
    }
}
</style>