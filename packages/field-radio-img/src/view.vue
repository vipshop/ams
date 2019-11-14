<template>
    <div :style="field.style">{{actualSelectOptionsText}}</div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldViewMixin, ams.mixins.fieldViewOptionsMixin]
};
</script>
