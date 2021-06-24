<!--
    以 fields: {
        'status': {
            'type': 'text',
            'label': 'status',
            view(fieldValue, field) {
            return fieldValue > 0 ? `+${fieldValue}` : `-$          {fieldValue}`
            },
        },
    }
    为例：

    `ams-field-${field.type}-${field.ctx}` === 'ams-field-text-view'

    其中
    field === {
        "name": "status",
        "ctx": "view",
        "props": {
            "clearable": true
        },
        "on": {},
        "type": "text",
        "label": "status",
        "default": ""
    }

    value ==== 2
    name(blockName) === 'dspListView'
    path(第一行) === list[0].status
 -->
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