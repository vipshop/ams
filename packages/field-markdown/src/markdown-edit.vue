<template>
    <div :style="field.style">
        <mavon-editor v-model="localValue" v-bind="field.props"/>
    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            // localValue: ''
        };
    }
};
</script>
