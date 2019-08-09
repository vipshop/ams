<template>
    <div v-if="field.fields"
         :style="field.style">
        <el-radio-group size="mini" disabled
                        :value="current">
            <el-radio-button :label="key"
                             :key="key"
                             v-for="(item, key) in field.fields">{{item.label}}</el-radio-button>
        </el-radio-group>
        <div v-if="field.fields[current]" class="ams-field-union-field">
            <component :is="`ams-field-${field.fields[current].type}-${field.fields[current].ctx}`"
                       :field="field.fields[current]"
                       :value="value"
                       :name="name"
                       :path="path"
                       :class="`ams-field ams-field-${field.fields[current].type}-${field.fields[current].ctx}`" />
        </div>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin],
    computed: {
        current() {
            return this.field.current || Object.keys(this.field.fields)[0];
        }
    }
};
</script>
