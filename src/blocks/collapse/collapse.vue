<template>
    <div v-if="ready"
         class="ams-block-collapse"
         :style="block.style">
        <el-collapse v-model="data.active" v-on="on" :accordion="block.props.accordion || false">
            <template v-for="(value, key) in block.options">
                    <el-collapse-item :key="key" :name="key">
                        <template slot="title">
                            <span v-html="value"></span>
                        </template>
                        <ams-block :name="key" />
                    </el-collapse-item>
            </template>
        </el-collapse>
        <ams-operations
        :operations="block.operations"
        :name="name"
        class="operations"/>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin]
};
</script>
