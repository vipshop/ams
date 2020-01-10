<template>
    <div v-on="on"
         v-html="viewValue"
         :style="field.style"
         v-bind="field.props"></div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>
