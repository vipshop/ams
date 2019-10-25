<template>
    <div v-if="value && value.length && field.field" :style="field.style">
        <el-form-item v-for="(val, index) in value"
                      :key="index"
                      :label-width="field.field.labelWidth"
                      :label="field.field.label && field.field.label + (index + 1)"
                      :rules="field.field.rules"
                      class="ams-array-item"
                      :prop="field.field.type !== 'array' && field.field.type !== 'object' ? `${path}[${index}]` : ''">
            <component :is="`ams-field-${field.field.type}-${field.field.ctx}`"
                       :field="field.field"
                       :value="val"
                       :name="name"
                       :path="`${path}[${index}]`"
                       :context="context"
                       :class="`ams-field ams-field-${field.field.type}-${field.field.ctx}`" />
        </el-form-item>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewArrayMixin]
};
</script>
<style lang="scss">
.ams-block-list{
    .ams-array-item{
        margin-bottom: 20px;
        .el-form-item__label,.el-form-item__content{
            line-height: 24px;
        }
    }
}
</style>