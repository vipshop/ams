<template>
    <component :is="`ams-field-${field.type}-${field.ctx}`"
        :field="field"
        :value="value"
        :name="name"
        :path="path"
        :class="`ams-field ams-field-${field.type}-${field.ctx}`" />
</template>
<script>
export default {
    props: ['field', 'value', 'name', 'path']
};
</script>