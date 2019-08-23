<template>
    <div :style="field.style" v-html="value"></div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin]
};
</script>

<style lang="scss">
// .ams-field-editor-view {
//     border: 1px solid #d9d9d9;
// }
</style>

