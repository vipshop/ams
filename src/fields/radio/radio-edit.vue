<template>
    <div :style="field.style">
        <el-radio :key="item.value"
                  v-for="item in options"
                  v-model="localValue"
                  :label="item.value"
                  v-on="on"
                  v-bind="item">{{item.label}}</el-radio>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin]
};
</script>
