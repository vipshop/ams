<template>

    <el-tooltip :disabled="!tooltip"
                v-bind="tooltip">
        <el-badge v-bind="badge">

            <el-button @click.stop="emit"
                :style="field.style"
                v-on="on"
                v-bind="field.props">{{field.props.text || field.label}}</el-button>

        </el-badge>
    </el-tooltip>

</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldButtonMixin]
};
</script>
