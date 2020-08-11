<template>
    <div v-if="value && field.fields"
         :style="field.style">
        <i v-if="collapseKeys.length"
            @click="collapseStatus = !collapseStatus"
            class="el-icon icon-collapse"
            :class="collapseStatus ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        <template v-for="(fieldLayout, key) in layout">
            <template v-if="fieldLayout && getShowState(field.fields[key], value) && !(!collapseStatus && collapseKeys.indexOf(key) >= 0)">
                <el-form-item v-if="typeof fieldLayout === 'string'"
                              :label="field.fields[key].labelWidth !== '0' ? field.fields[key].label : ''"
                              :key="key"
                              :class="field.fields[key].props && field.fields[key].props.inline ? 'el-form-item-inline' : ''"
                              :style="`width: ${field.fields[key].props && field.fields[key].props.formItemWidth}`"
                              :label-width="field.fields[key].labelWidth"
                              :rules="field.fields[key].rules"
                              class="ams-array-item"
                              :prop="field.fields[key].type !== 'array' && field.fields[key].type !== 'object' ? `${path}.${key}` : ''">
                    <template
                        v-if="field.fields[key].label && field.fields[key].labelWidth !== '0'"
                        slot="label">
                        <el-tooltip effect="dark"
                                    placement="top"
                                    v-if="field.fields[key].info">
                            <i class="el-icon-info ams-form-label-info"></i>
                            <div slot="content"
                                 v-html="field.fields[key].info"></div>
                        </el-tooltip>
                        {{field.fields[key].label}}
                    </template>
                    <field :field="getField(field.fields[key], value)" :value="value[key]" :context="context" :name="name" :path="`${path}.${key}`"/>
                    <div class="ams-form-item-desc"
            v-if="field.fields[key].desc && field.fields[key].ctx === 'edit'"
            v-html="field.fields[key].desc"></div>
                </el-form-item>
                <el-form-item v-else
                              :label="field.fields[key].labelWidth !== '0' ? field.fields[key].label : ''"
                              :label-width="field.fields[key].labelWidth"
                              class="ams-form-inline ams-array-item"
                              :key="key">
                    <template v-if="field.fields[key].label && field.fields[key].labelWidth !== '0'"
                              slot="label">
                        <el-tooltip effect="dark"
                                    placement="top"
                                    v-if="field.fields[key].info">
                            <i class="el-icon-info ams-form-label-info"></i>
                            <div slot="content"
                                 v-html="field.fields[key].info"></div>
                        </el-tooltip>
                        {{field.fields[key].label}}
                    </template>
                    <el-form-item v-for="fieldName in fieldLayout"
                                  :key="fieldName"
                                  :label="(fieldName === key && field.fields[fieldName].labelWidth === '0') ? '' : field.fields[fieldName].label"
                                  :label-width="field.fields[fieldName].labelWidth"
                                  :rules="field.fields[fieldName].rules"
                                  :prop="field.fields[fieldName].type !== 'array' && field.fields[fieldName].type !== 'object' ? `${path}.${fieldName}` : ''">
                        <field :field="getField(field.fields[fieldName], value)" :value="value[fieldName]" :context="context" :name="name" :path="`${path}.${fieldName}`"/>
                    </el-form-item>
                    <div class="ams-form-item-desc"
            v-if="field.fields[key].desc && field.fields[key].ctx === 'edit'"
            v-html="field.fields[key].desc"></div>
                </el-form-item>
            </template>
        </template>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import field from '../../components/field';

export default {
    components: {
        field
    },
    mixins: [mixins.fieldEditArrayMixin, mixins.getShowState, mixins.getField],
    data() {
        return {
            layout: null,
            collapseStatus: true
        };
    },
    computed: {
        collapseKeys() {
            return this.field.props && this.field.props.collapseKeys || [];
        }
    },
    created() {
        if (this.field.fields) {
            this.layout = this.$block.getFieldsLayout(this.field.fields, this.field.layout);
        }
        if (this.collapseKeys.length) {
            this.collapseStatus = false;
        }
    }
};
</script>
<style scoped>
.icon-collapse {
   position: absolute;
   font-size: 28px;
   margin-top: 6px;
   color: #888;
}
</style>

