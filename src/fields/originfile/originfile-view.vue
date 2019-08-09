<template>
    <a :href="value"
       :style="field.style"
       download
       v-if="value"><i class="el-icon-document"></i>{{viewValue}}</a>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>
