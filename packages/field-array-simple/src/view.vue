<template>
    <div v-if="value && value.length && field.field" :style="field.style">
        <el-form-item v-for="(val, index) in value"
                      v-if="field.field && getShowState(field.field, val)"
                      :key="index"
                      :label-width="field.field.labelWidth"
                      :label="field.field.label?(field.field.label + (index + 1)):''"
                      :rules="field.field.rules"
                      class="ams-array-item"
                      :prop="field.field.type !== 'array' && field.field.type !== 'object' ? `${path}[${index}]` : ''">
            <component :is="`ams-field-${field.field.type}-${field.field.ctx || ctx}`"
                       :field="field.field"
                       :value="val"
                       :name="name"
                       :path="`${path}[${index}]`"
                       :class="`ams-field ams-field-${field.field.type}-${field.field.ctx || ctx}`" />
        </el-form-item>
    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewArrayMixin],
    methods: {
        getShowState(field, data) {
            if (!field || field.hidden) {
                return false;
            }

            // array下面的object增加显隐控制
            if (field.type === 'object') {

                const type = typeof field.show;
                if (type === 'undefined') {
                    return true;
                } else if (type === 'string') {
                    return ams.utils.get(data, field.show);
                } else if (type === 'object') {
                    // eslint-disable-next-line eqeqeq
                    return ams.utils.get(data, field.show.name) == field.show.value;
                } else if (type === 'function') {
                    return field.show.call(this, data);
                }
            } else {
                return true;
            }
        }
    }
};
</script>
