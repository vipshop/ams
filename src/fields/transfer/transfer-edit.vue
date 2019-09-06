<template>
    <el-transfer v-model="localValue"
                 :data="field.props.options"
                 v-on="on"
                 class="ams-field-transfer"
                 :style="field.style"
                 v-bind="field.props">
        <template v-if="slots['left-footer']" slot="left-footer">
            <el-button v-for="(button, buttonIndex) in slots['left-footer']"
                :key="buttonIndex"
                @click="button.onClick"
                :style="button.style"
                class="ams-field-transfer-footer"
                v-bind="button.props">{{ button.text }}</el-button>
        </template>
        <template v-if="slots['right-footer']" slot="right-footer">
            <el-button v-for="(button, buttonIndex) in slots['right-footer']"
                :key="buttonIndex"
                @click="button.onClick"
                class="ams-field-transfer-footer"
                v-bind="button.props">{{ button.text }}</el-button>
        </template>
    </el-transfer>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    computed: {
        slots() {
            const slots = this.field && this.field.slots || {};
            const result = {};
            ['left-footer', 'right-footer'].forEach(slot => {
                result[slot] = slots[slot] || null;
            });
            return result;
        }
    }
};
</script>
<style lang="scss" scoped>
.ams-field-transfer-footer {
    margin-left: 8px;
}
</style>

