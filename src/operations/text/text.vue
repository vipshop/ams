<template>
    <span @click.stop="emit"
        :class="className"
        :style="operation.style"
        v-bind="operation.props">
        <template v-if="operation.label">{{operation.label}}</template>
    </span>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin],
    computed: {
        className() {
            let cla = 'ams-operation-text';
            if (this.operation.props && this.operation.props.type) {
                cla += ` ams-operation-text--${this.operation.props.type}`;
            }
            return cla;
        }
    },
};
</script>

