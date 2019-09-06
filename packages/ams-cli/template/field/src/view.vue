<template>
    <el-color-picker :value="value"
                     :style="field.style"
                     v-bind="field.props" />
</template>

<script>
import ams from '@ams-team/ams';
ams.config({
    defaultFieldConfig: {
        'plan-date': {
            get: ams.configs.getDate,
            set: ams.configs.setDate,
            view: ams.configs.viewDate,
            equals: ams.configs.equals
        }
    }
});
export default {
    mixins: [ams.mixins.fieldViewMixin]
};
</script>
