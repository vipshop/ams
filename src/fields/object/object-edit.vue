<template>
    <div v-if="value && field.fields"
         :style="field.style">
        <template v-for="(fieldLayout, key) in layout">
            <template v-if="fieldLayout && getShowState(field.fields[key], value)">
                <el-form-item v-if="typeof fieldLayout === 'string'"
                              :label="field.fields[key].label"
                              :key="key"
                              :label-width="field.fields[key].labelWidth"
                              :rules="field.fields[key].rules"
                              class="ams-array-item"
                              :prop="field.fields[key].type !== 'array' && field.fields[key].type !== 'object' ? `${path}.${key}` : ''">
                    <template
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
                    <component :is="`ams-field-${field.fields[key].type}-${field.fields[key].ctx}`"
                               :field="getField(field.fields[key], value)"
                               :value="value[key]"
                               :name="name"
                               :path="`${path}.${key}`"
                               :class="`ams-field ams-field-${field.fields[key].type}-${field.fields[key].ctx}`" />
                    <div class="ams-form-item-desc"
            v-if="field.fields[key].desc && field.fields[key].ctx === 'edit'"
            v-html="field.fields[key].desc"></div>
                </el-form-item>
                <el-form-item v-else
                              :label="field.fields[key].label"
                              :label-width="field.fields[key].labelWidth"
                              class="ams-form-inline ams-array-item"
                              :key="key">
                    <template v-if="field.fields[key].label"
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
                                  :label="fieldName === key ? '' : field.fields[fieldName].label"
                                  :label-width="field.fields[fieldName].labelWidth"
                                  :rules="field.fields[fieldName].rules"
                                  :prop="field.fields[fieldName].type !== 'array' && field.fields[fieldName].type !== 'object' ? `${path}.${fieldName}` : ''">
                        <component :is="`ams-field-${field.fields[fieldName].type}-${field.fields[fieldName].ctx}`"
                                   :field="getField(field.fields[fieldName], value)"
                                   :value="value[fieldName]"
                                   :name="name"
                                   :path="`${path}.${fieldName}`"
                                   :class="`ams-field ams-field-${field.fields[fieldName].type}-${field.fields[fieldName].ctx}`" />
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

export default {
    mixins: [mixins.fieldEditArrayMixin, mixins.getShowState, mixins.getField],
    data() {
        return {
            layout: null
        };
    },
    created() {
        if (this.field.fields) {
            this.layout = this.$block.getFieldsLayout(this.field.fields, this.field.layout);
        }
    }
};
</script>
