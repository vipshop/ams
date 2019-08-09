<template>
    <img :src="viewValue"
         :style="field.style"
         v-if="viewValue" />
    <i class="el-icon-picture"
       v-else></i>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-image-view {
    font-size: 50px;
    display: block;
    max-width: 100px;
}
</style>

