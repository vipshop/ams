<template>
  <div :style="field.style">
    <el-tag
        v-for="(tag, index) in actualTags"
        v-bind="field.props"
        :closable="false"
        :key="index"
        :title="tag">
        {{ tag }}
    </el-tag>
    <el-popover popper-class="ams-field-tag-view-popover" v-if="showMoreIcon"
                :placement="field.collapsePlacement || 'right'"
                :title="field.collapseTitle || ''"
                :width="field.collapseWidth || 300"
                trigger="hover">
                <div class="ams-field-tag-view-popover-body">
                    <el-tag
                        v-for="(tag, index) in tags"
                        v-bind="field.props"
                        :closable="false"
                        :key="index"
                        :title="tag">
                        {{ tag }}
                    </el-tag>
                </div>
        <span slot="reference">... <el-tag size="mini" type="info">共{{ tags.length }}个<i class="el-icon-arrow-right"></i></el-tag></span>
    </el-popover>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin],
    data() {
        return {
            idRegExp: null, // 替换id字段的正则
            nameRegExp: null, // 替换name字段的正则
            subNameRegExp: null // 替换subName字段的正则
        };
    },
    computed: {
        tags() {
            if (this.field.view) {
                return this.field.view(this.value, this.field);
            }
            if (this.value) {
                if (typeof this.value === 'string') {
                    const vals = this.value.split(',');
                    return vals;
                } else if (this.value instanceof Array) {
                    // 如果值是数组
                    return this.value.map(item => {
                        if (item instanceof Object) {
                            let template = this.field.props.template;
                            const id = item[this.field.props['idKey']] || '';
                            const name = item[this.field.props['nameKey']] || '';
                            const subName = item[this.field.props['subNameKey']] || '';
                            if (!template) {
                                return name;
                            }
                            return template.replace(this.idRegExp, id).replace(this.nameRegExp, name).replace(this.subNameRegExp, subName);
                        } else {
                            return item;
                        }
                    });
                }
            }
            return [];
        },
        showOptionsLimit() {
            const limit = this.field.collapseLimit;
            if (limit) {
                return typeof limit === 'number' ? limit : 1;
            }
            return this.tags.length;
        },
        showMoreIcon() {
            return this.field.collapseLimit && this.tags.length > this.showOptionsLimit;
        },
        actualTags() {
            if (this.showMoreIcon) {
                return this.tags.slice(0, this.showOptionsLimit);
            }
            return this.tags;
        }
    },
    mounted() {
        this.idRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['idKey']})\\s*\\}\\}`, 'ig');
        this.nameRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['nameKey']})\\s*\\}\\}`, 'ig');
        this.subNameRegExp = new RegExp(`\\{\\{\\s*(${this.field.props['subNameKey']})\\s*\\}\\}`, 'ig');
    }
};
</script>

<style lang="scss">
.ams-field-tag-view,.ams-field-tag-view-popover{
    .el-tag{
        height: 40px;
        line-height: 38px;
        padding: 0 12px;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        vertical-align: middle;
        &--medium{
            height: 36px;
            line-height: 34px;
            padding: 0 12px;
            font-size: 13px;
        }
        &--small{
            height: 32px;
            line-height: 30px;
            padding: 0 10px;
        }
        &--mini{
            height: 28px;
            padding: 0 8px;
            line-height: 26px;
            font-size: 12px;
        }
    }
    &-popover{
        .el-tag{
            margin-right: 6px;
            margin-bottom: 6px;
        }
    }
}
.ams-field-tag-view-popover-body{
    max-height: 500px;
    overflow-y: auto;
}
</style>
