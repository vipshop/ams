<template>
    <div>
        <component :is="`ams-field-${field.type}-${field.ctx}`"
            :field="field"
            :value="value"
            :name="name"
            :path="path"
            :context="context"
            :class="`ams-field ams-field-${field.type}-${field.ctx}`" />

        <div class="ams-form-item-desc" v-if="field.desc && field.ctx === 'edit'" v-html="field.desc"></div>
    </div>
</template>
<script>
export default {
    props: ['field', 'value', 'name', 'path', 'context']
};
</script>