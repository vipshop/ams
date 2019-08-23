<template>
    <div :style="field.style" class="ams-field-arraylist">
        <el-table :data="actualValue"
                    border
                    highlight-current-row>
            <el-table-column v-for="(field, fieldName) in fields"
                                :label="field.label"
                                v-if="!field.hidden"
                                :key="fieldName"
                                :prop="fieldName"
                                :column-key="fieldName"
                                fit
                                :min-width="'auto'"
                                align="center"
                                v-bind="field.props">
                <template slot-scope="scope">
                    <component :is="`ams-field-${field.type}-view`"
                           :field="field"
                           :value="scope.row[fieldName]"
                           :name="name"
                           :path="`arraylist[${scope.$index}].${fieldName}`"
                           :class="`ams-field ams-field-${field.type}-view`" />
                </template>
            </el-table-column>
            <el-table-column label="操作"
                                fit
                                fixed="right"
                                min-width="140px"
                                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" circle :disabled="showOperationForm" @click="showEditForm('edit', scope)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle :disabled="showOperationForm" @click="remove(scope.$index)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form :model="value[lastIndex]" ref="amsForm" v-if="showOperationForm" label-width="150px">
            <el-form-item v-for="(field, fieldName) in fields"
                            v-if="!field.hidden"
                            class="edit-form"
                            :key="fieldName"
                            :label="fields[fieldName].label"
                            :rules="fields[fieldName].rules"
                            :prop="fields[fieldName].type !== 'array' && fields[fieldName].type !== 'object' ? fieldName : ''">
                <component :is="`ams-field-${fields[fieldName].type}-${fields[fieldName].ctx || 'edit'}`"
                            :field="fields[fieldName]"
                            :value="value[lastIndex][fieldName]"
                            :name="fieldName"
                            :path="fieldName"
                            :class="`ams-field ams-field-${fields[fieldName].type}-${fields[fieldName].ctx || 'edit'}`" />
            </el-form-item>
            <div>
                <el-button size="mini" type="primary" @click="confirm()">确认</el-button>
                <el-button size="mini" @click="cancel()">取消</el-button>
            </div>
        </el-form>
        <div class="add-field" v-show="!showOperationForm">
            <el-button size="mini" @click="showEditForm('add')">新增 <i class="el-icon-plus"></i></el-button>
        </div>
    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditMixin],
    data() {
        return {
            showOperationIndex: -1,
            operationType: ''
        };
    },
    computed: {
        lastIndex() {
            return this.value.length ? this.value.length - 1 : 0;
        },
        fields() {
            if (this.field && this.field.fields) {
                Object.keys(this.field.fields).forEach(key => this.$block.initDefaultField(this.field.fields[key]));
                return this.field.fields;
            }
            return {};
        },
        showOperationForm() {
            return Boolean(this.operationType);
        },
        actualValue() {
            if (!this.value) this.localValue = [];
            if (this.showOperationForm) {
                return this.value.slice(0, this.lastIndex);
            }
            return this.value;
        }
    },
    provide: function() {
        return {
            fieldChange: this.arrayListFieldChange
        };
    },
    methods: {
        arrayListFieldChange(value, field, path) {
            if (!this.$ams.utils.set(this.value[this.lastIndex], path, value)) {
                console.warn(`set ${path} fail`);
            }
            this.$nextTick(() => {
                this.emitChangeEvent(path);
            });
        },
        emitChangeEvent(name) {
            this.$block.emitEvent('fieldChange', {
                field: this.field,
                value: this.value,
                path: name ? `${this.path}[${this.showOperationIndex}].${name}` : `${this.path}[${this.showOperationIndex}]`
            });
        },
        showEditForm(type, scope) {
            let defaultValue = null;
            this.editData = defaultValue;
            this.operationType = type;
            if (type === 'add') {
                defaultValue = Object.keys(this.fields).reduce((obj, cur) => Object.assign(obj, { [cur]: cur.default }), {});
                this.showOperationIndex = this.value.length;
            } else if (type === 'edit') {
                defaultValue = Object.assign({}, scope.row);
                this.showOperationIndex = scope.$index;
            }
            this.value.push(defaultValue);
            this.emitChangeEvent();
        },
        remove(index) {
            this.value.splice(index, 1);
            this.emitChangeEvent();
        },
        confirm() {
            this.$refs.amsForm.validate((valid) => {
                const data = Object.assign({}, this.value[this.lastIndex]);
                if (valid) {
                    if (this.operationType === 'edit') {
                        this.$ams.utils.set(this.$block.data, `${this.path}[${this.showOperationIndex}]`, data);
                        this.remove(this.value.length - 1);
                    }
                    this.reset();
                }
            });
        },
        cancel() {
            this.remove(this.value.length - 1);
            this.reset();
        },
        reset() {
            this.operationType = '';
        }
    }
};
</script>

<style lang="scss" scoped>
.ams-field-arraylist {
    .add-field {
        text-align: center;
        width: 100%;
        border: 1px solid #EBEEF5;
        border-top: none;
        padding: 4px 0;
    }
    .edit-form {
        margin: 20px 0;
    }
}
</style>
