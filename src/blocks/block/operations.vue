<template>
    <div v-if="Object.keys(operations).length" class="ams-operations el-form--inline">
        <template v-for="(operation, operationKey) in operations">
            <div class="el-form-item"
                :class="operation.props && operation.props.inline === false ? 'el-form-item--block' : ''"
                 v-if="getShowState(operation, context)"
                 :key="operationKey">
                 <el-tooltip effect="dark" placement="top" v-if="operation.info">
                    <i class="el-icon-info ams-form-label-info el-form-item__label"></i>
                    <div slot="content" v-html="operation.info"></div>
                </el-tooltip>
                <label v-if="operation.label && !/^(?:button|reset|icon|text)$/.test(operation.type)"
                class="el-form-item__label">{{operation.label}}</label>
                <div class="el-form-item__content">
                    <component :is="'ams-operation-' + getOpType(operation.type)"
                               :name="name"
                               :operation-key="operationKey"
                               :context="context"
                               :path="path"
                               class="ams-operation"
                               :operation="getField(operation, context)" />
                    <div class="ams-form-item-desc" v-if="operation.desc" v-html="operation.desc"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import ams from '../../ams';
import mixins from '../../ams/mixins';

const operationTypes = ['button', 'dropdown', 'icon', 'reset', 'text']; // TODO 这里列出了部分不需要处理的operations类型
export default {
    mixins: [mixins.getShowState, mixins.getField],
    props: {
        name: {
            type: String,
            default: '',
            required: true
        },
        slotName: {
            type: String,
            default: ''
        },
        slotFieldKey: {
            type: String,
            default: ''
        },
        context: {
            type: [String, Object, Array],
            default: '',
            required: false
        }
    },

    inject: ['$block'],
    // data() {
    //     return {
    //         isInit: true
    //     };
    // },

    computed: {
        path() {
            return this.slotName || this.slotFieldKey || 'defaultOperations';
        },
        operations() {
            // console.log(this.name);
            let operations = ams.blocks[this.name] && ams.blocks[this.name].operations || {};
            let currentOperations = {};

            Object.keys(operations).forEach(key => {
                let operation = operations[key];
                let sName = this.slotName || '';
                operation.slot = operation.slot || '';
                // 只渲染对应slot的operation
                if (sName === operation.slot) {
                    currentOperations[key] = operation;
                }
            });
            this.getDefaultValue(currentOperations);

            return currentOperations;
        }
    },
    methods: {
        setFieldDefaultValue(operationFields, slotName, data) {
            Object.keys(operationFields).forEach(key => {
                let field;
                let type = typeof operationFields[key];
                if (type === 'object') {
                    field = {
                        name: key,
                        ...operationFields[key]
                    };
                } else if (type === 'string') {
                    field = this.$block.fields[operationFields[key]];
                } else if (this.$block.fields[key]) {
                    // 使用operationKey作为默认的key
                    field = this.$block.fields[key];
                } else {
                    field = {
                        name: key,
                        ...operationFields[key]
                    };
                }

                if (field) {
                    let defaultData;
                    if (this.$block.block.data && this.$block.block.data[slotName] && typeof this.$block.block.data[slotName][key] !== 'undefined') {
                        // todo: copy object?
                        defaultData = this.$block.block.data[slotName][key];
                    }
                    // if (this.$block.block.data && this.$block.block.data[slotName] && typeof this.$block.block.data[slotName][key] !== 'undefined') {
                    //     // todo: copy object?
                    //     defaultData = this.$block.block.data[slotName][key];
                    // }
                    data[key] = this.$block.setFieldData(defaultData, field, `${slotName}.${key}`);
                    // console.log(data);
                }
            });
        },
        getDefaultValue(operations) {
            let isEmpty = true;
            let data = {};
            let slotName = this.path;
            operations = operations || this.operations;

            // console.log('slotName', slotName);
            Object.keys(operations).forEach(key => {
                let operation = operations[key];
                if (operationTypes.indexOf(operation.type) < 0) {
                    isEmpty = false;
                    this.setFieldDefaultValue({ [key]: operation.field }, slotName, data);
                }

                // 获取moreSearchs里面fields的默认值
                if (operation.type === 'dropdown' && operation.fields) {
                    isEmpty = false;
                    this.setFieldDefaultValue(operation.fields, slotName, data);
                }
            });
            if (!isEmpty) {
                this.$set(this.$block.data, slotName, data);
            }
        },
        getOpType(type) {
            if (operationTypes.indexOf(type) >= 0) {
                return type;
            }
            return 'field';
        }
    }
};
</script>

<style lang="scss">
.ams-block {
    td.is-center {
        .ams-operations.el-form--inline {
            > .el-form-item:last-child {
                margin-right: 0;
            }
        }
    }
    .ams-operations .el-form-item {
        margin-bottom: 12px;
        .el-form-item__content{
            line-height: 40px;
        }
    }
}
</style>

