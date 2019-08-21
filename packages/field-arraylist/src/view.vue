<template>
    <div v-if="actualViewText && fields" :style="field.style" class="ams-field-arraylist">
        <el-table :data="actualViewText"
                    border
                    highlight-current-row>
            <el-table-column v-for="(field, fieldName) in fields"
                                :label="field.label"
                                v-show="!field.hidden"
                                :key="fieldName"
                                :prop="fieldName"
                                :column-key="fieldName"
                                fit
                                :min-width="'auto'"
                                align="center"
                                v-bind="field.props">
                <template slot-scope="scope">
                    <component :is="`ams-field-${field.type}-${field.ctx}`"
                        :field="field"
                        :value="scope.row[fieldName]"
                        :name="name"
                        :path="`arraylist[${scope.$index}].${fieldName}`"
                        :class="`ams-field ams-field-${field.type}-${field.ctx}`" />
                </template>
            </el-table-column>
        </el-table>
        <div class="show-more" v-if="collapseLimit">
            <el-button size="mini" @click="showAllContent = !showAllContent">
                <template v-if="showAllContent">收起<i class="el-icon-arrow-up"></i></template>
                <template v-else>展开<i class="el-icon-arrow-down"></i></template>
            </el-button>
        </div>
    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin],
    data() {
        return {
            showAllContent: false
        };
    },
    computed: {
        collapseLimit() {
            if (
                !this.value || 
                !this.value.length || 
                !this.field.props || 
                !this.field.props.collapseLimit ||
                this.value && Number(this.field.props.collapseLimit) >= this.value.length
            ) return undefined;
            return this.field.props.collapseLimit;
        },
        fields() {
            if (this.field && this.field.fields) {
                Object.keys(this.field.fields).forEach(key => this.$block.initDefaultField(this.field.fields[key]));
                return this.field.fields;
            }
            return {};
        },
        actualViewText() {
            if (this.value && !this.showAllContent && this.collapseLimit) {
                return this.value.slice(0, this.collapseLimit);
            }
            return this.value;
        }
    }
};
</script>

<style lang="scss" scoped>
.ams-field-arraylist {
    .show-more {
        text-align: center;
        width: 100%;
        border: 1px solid #EBEEF5;
        border-top: none;
        padding: 4px 0;
    }
}
</style>
