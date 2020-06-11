<template>
    <div :style="field.style">
        <el-button size="mini"
                   circle
                   @click="addArrayField"
                   icon="el-icon-plus"></el-button>
        <div>
            <el-form-item v-for="(val, index) in value"
                          :key="index"
                          :label="field.field.label && field.field.label + (index + 1)"
                          :label-width="field.field.labelWidth"
                          :rules="field.field.rules"
                          class="ams-array-item"
                          :prop="field.field.type !== 'array' && field.field.type !== 'object' ? `${path}[${index}]` : ''">
                <div slot="label"
                     class="ams-field-array-label">
                     <el-button size="mini"
                            circle
                            @click="toggleOperation(index)"
                            icon="el-icon-more"></el-button>
                    <template v-if="showOperationIndex === index">
                        <el-button type="danger"
                                    size="mini"
                                    circle
                                    @click="removeArrayField(index)"
                                    icon="el-icon-minus"></el-button>
                        <el-button size="mini"
                                    circle
                                    v-if="index && sortable"
                                    @click="moveUp(index)"
                                    icon="el-icon-caret-top"></el-button>
                        <el-button size="mini"
                                    circle
                                    v-if="index < value.length - 1 && sortable"
                                    @click="moveDown(index)"
                                    icon="el-icon-caret-bottom"></el-button>
                    </template>
                    {{field.field.label && field.field.label + (index + 1)}}
                </div>

                <component :is="`ams-field-${field.field.type}-${field.field.ctx}`"
                           :field="field.field"
                           :value="val"
                           :name="name"
                           :context="context"
                           :path="`${path}[${index}]`"
                           :class="`ams-field ams-field-${field.field.type}-${field.field.ctx} ${!field.field.label ? 'ams-field-no-label': ''}`" />
            </el-form-item>
        </div>

    </div>
</template>

<script>
/* eslint-disable no-undefined */
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldEditArrayMixin],
    data() {
        return {
            showOperationIndex: -1
        };
    },
    inject: ['fieldChange'],
    computed: {
        maxLimit() {
            return this.field.props && this.field.props.max;
        },
        minLimit() {
            return this.field.props && this.field.props.min;
        },
        sortable() {
            return !(this.field.props && this.field.props.sortable === false);
        }
    },
    methods: {
        emitChangeEvent() {
            this.$block.emitEvent('fieldChange', {
                field: this.field,
                value: this.value,
                path: this.path
            });
        },
        addArrayField() {
            if (this.maxLimit && this.value.length >= this.maxLimit) {
                this.$alert('已超过最大限制长度');
            } else {
                // console.log(this.$block.setFieldData(undefined, this.field.field, `${this.path}[${this.value.length}]`));
                this.value.push(this.$block.setFieldData(undefined, this.field.field, `${this.path}[${this.value.length}]`));
                this.emitChangeEvent();
            }
        },
        removeArrayField(index) {
            if (this.minLimit && this.value.length <= this.minLimit) {
                this.$alert('不能低于最小限制长度');
            } else {
                this.value.splice(index, 1);
                this.emitChangeEvent();
            }
        },
        toggleOperation(index) {
            this.showOperationIndex = index === this.showOperationIndex ? -1 : index;
        },
        moveUp(index) {
            this.showOperationIndex = index - 1;
            this.swap(index - 1);
        },
        moveDown(index) {
            this.showOperationIndex = index + 1;
            this.swap(index);
        },
        swap(index) {
            let rows = [this.value[index], this.value[index + 1]];
            this.value.splice(index, 2, rows[1], rows[0]);
            this.emitChangeEvent();
        }
    }
};
</script>

<style lang="scss">
.ams-field-array-label {
    position: relative;
    z-index: 2;
    padding-left: 30px;
    .el-button {
        position: absolute;
        z-index: 1;
        // margin: 0;
        top: 6px;
        // margin-top: -14px;
        &:nth-child(1) {
            left: 0;
        }
        &:nth-child(2) {
            left: 23px;
        }
        &:nth-child(3) {
            left: 56px;
        }
        &:nth-child(4) {
            left: 89px;
        }
    }
}
.el-form-item .ams-array-item.el-form-item {
    margin-bottom: 22px;
    &:last-child {
        // 最后一个要重置为0，否则多层array和object嵌套会导致margin叠加空白
        margin-bottom: 0;
    }
}
// 没有label时
.ams-field-no-label{
    padding-left: 35px;
}
</style>
