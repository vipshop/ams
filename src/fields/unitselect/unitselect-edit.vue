<template>
    <el-input v-model="val"
              @change="changeVal"
              v-on="on"
              :style="field.style"
              v-bind="field.props">
        <el-select v-model="unit"
                   @change="changeUnit"
                   placeholder="选择"
                   :style="`width:${field.props.unitWidth}`"
                   :slot="field.props.slot || 'append'">
            <el-option v-for="key in field.units"
                       :key="key"
                       :label="key"
                       :value="key" />
        </el-select>
    </el-input>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin],
    data() {
        return {
            val: '',
            unit: ''
        };
    },
    watch: {
        localValue(localValue, old) {
            // console.log('localValue change', localValue, old)
            this.val = localValue.val;
            this.unit = localValue.unit;
        }
    },
    mounted() {
        // console.log('mounted', this.localValue)
        this.val = this.localValue.val;
        this.unit = this.localValue.unit;
    },
    methods: {
        changeVal(e) {
            // console.log('changeVal', e, this.val)
            this.localValue = {
                val: this.val,
                unit: this.unit,
            };
            this.on.change && this.on.change(this.localValue);
        },
        changeUnit(e) {
            // console.log('changeUnit', e, this.unit)
            this.localValue = {
                val: this.val,
                unit: this.unit,
            };
            this.on.change && this.on.change(this.localValue);
        }
    }
};
</script>

<style lang="scss">
.ams-field-unitselect-edit {
    .el-select .el-input {
        min-width: 75px;
        width: 100%;
    }
    // .el-input-group__append {
    //     background-color: #f1f1f1;
    // }
}
</style>

