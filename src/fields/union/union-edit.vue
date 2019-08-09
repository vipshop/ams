<template>
    <div v-if="field.fields"
         :style="field.style">
        <el-radio-group size="mini"
                        v-model="current">
            <template v-for="(item, key) in field.fields">
                <el-radio-button :label="key"
                                 :key="key"
                                 v-if="item">{{item.label}}</el-radio-button>
            </template>
        </el-radio-group>
        <div v-if="field.fields[current]"
             class="ams-field-union-field">
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
    mixins: [mixins.fieldEditMixin],
    computed: {
        current: {
            get() {
                return this.field.current || Object.keys(this.field.fields)[0];
            },
            set(val) {
                // this.field.current = val;
                let field = this.field.fields[val];
                // eslint-disable-next-line no-undefined
                this.fieldChange(this.$block.setFieldData(undefined, field, this.path), field, this.path);
                this.$set(this.field, 'current', val);
            }
        }
    }
};
</script>

<style lang="scss">
.ams-field-union-field {
    margin-top: 10px;
}
</style>
