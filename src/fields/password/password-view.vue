<template>
    <div :style="field.style">{{ viewValue }}</div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>
