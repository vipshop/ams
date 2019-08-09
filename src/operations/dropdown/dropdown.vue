<template>
    <el-popover class="ams-operation-dropdown"
                placement="top-start"
                trigger="click">

        <el-input slot="reference"
                    :style="operation.style"
                    v-bind="operation.props"
                    v-model="textValue"></el-input>

        <el-form v-if="operation.fields"
                label-width="130px"
                class="ams-operation-dropdown-form">

            <!-- 循环渲染下拉搜索的field -->
            <el-form-item v-for="(field, key) in operation.fields"
                            :label="fields[key].label"
                            :key="key"
                            :prop="fields[key].type !== 'array' && fields[key].type !== 'object' ? key : ''">

                <component :is="`ams-field-${fields[key].type}-edit`"
                            :field="fields[key]"
                            :value="$block.data[path][key]"
                            :name="name"
                            :path="`${path}.${key}`"
                            :hide-on-click="false"
                            :class="`ams-field ams-field-${fields[key].type}-edit`" />

            </el-form-item>

            <!-- 默认按钮 -->
            <el-form-item align="right">
                <el-button @click="emit" type="primary">搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>

        </el-form>

    </el-popover>
</template>

<script>
/* eslint-disable vue/require-prop-types */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.operationMixin],
    inject: ['$block'],
    computed: {
        fields() {
            return this.$block.fields;
        },
        textValue: {
            get() {
                const path = this.path;
                const searchText = [];
                const searchData = this.$block && this.$block.data && this.$block.data[path] || {};

                Object.keys(searchData).forEach(name => {
                    let val = searchData[name];
                    if (val) {
                        searchText.push(val);
                    }
                });
                return searchText.join(',');
            },
            set(val) {
                // set
            }
        }
    },
    methods: {
        // 搜索表单重置
        reset() {
            this.$parent.getDefaultValue && this.$parent.getDefaultValue();
        }
    }
};
</script>

<style lang="scss">
.ams-operation-dropdown {
    .ams-operation-dropdown-form {
        padding: 20px 20px 0 10px;
    }
}
</style>
