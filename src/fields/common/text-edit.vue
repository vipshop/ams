<template>
    <el-input v-model="localValue"
              v-on="on"
              :style="field.style"
              v-bind="field.props">
              <template v-for="item in slots" :slot="item">
                  <template v-if="field.slots && field.slots[item]">{{field.slots[item]}}</template>
              </template>
    </el-input>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    data() {
        return {
            slots: [
                'prefix',
                'suffix',
                'prepend',
                'append'
            ]
        };
    }
};
</script>
