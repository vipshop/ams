<template>
    <div :style="field.style">

        <el-radio-group v-model="localValue" v-on="on" v-bind="field.props">

            <template v-if="field.props && field.props.type === 'button'">
                <el-radio-button :key="item.value"
                    v-for="item in options"
                    :label="item.value"
                    v-bind="item">{{item.label}}</el-radio-button>
            </template>

            <template v-else>
                <el-radio :key="item.value"
                    v-for="item in options"
                    :label="item.value"
                    :border="field.props && field.props.type === 'border'"
                    v-bind="item">{{item.label}}</el-radio>
            </template>

        </el-radio-group>


    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditMixin, mixins.fieldEditOptionsMixin]
};
</script>
