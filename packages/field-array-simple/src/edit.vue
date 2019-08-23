<template>
    <div :style="field.style">

        <div class="ams-array-simple-card">
            <el-form-item v-for="(val, index) in value"
                        v-if="field.field && getShowState(field.field, val)"
                        :key="index"
                        :label="field.field.label"
                        :rules="field.field.rules"
                        :label-width="field.field.labelWidth"
                        class="ams-array-simple-item"
                        :prop="field.field.type !== 'array' && field.field.type !== 'object' ? `${path}[${index}]` : ''">

                <div slot="label"
                    class="ams-field-array-simple-label" v-if="field.field.label">
                    {{field.field.label}}
                </div>

                <div class="ams-field-array-simple-item">
                    <component :is="`ams-field-${field.field.type}-${field.field.ctx || ctx}`"
                        :field="field.field"
                        :value="val"
                        :name="name"
                        :path="`${path}[${index}]`"
                        :class="`ams-field ams-field-${field.field.type}-${field.field.ctx || ctx}`" />

                    <div class="ams-field-array-simple-delete" v-if="!hideDel">
                        <i class="el-icon-delete" @click="removeArrayField(index)"></i>
                    </div>
                </div>
            </el-form-item>

            <el-button style="margin-top: 5px;"
                    v-if="!hideAdd"
                    v-bind="field.props"
                    @click="addArrayField">新增<i class="el-icon-plus el-icon--right"></i></el-button>
        </div>
    </div>
</template>

<script>
import ams from '@ams-team/ams';

export default {
    mixins: [ams.mixins.fieldEditArrayMixin],
    data() {
        return {
            hideAdd: false,
            hideDel: false
        };
    },
    inject: ['fieldChange'],
    mounted() {
        ams.bus.$on('fieldArraySimple.hideOperation', ({ hideAdd, hideDel }) => {
            this.hideAdd = hideAdd;
            this.hideDel = hideDel;
        });
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
            let ud;
            // console.log(this.$block.setFieldData(ud, this.field.field, `${this.path}[${this.value.length}]`));
            this.value.push(this.$block.setFieldData(ud, this.field.field, `${this.path}[${this.value.length}]`));
            this.emitChangeEvent();
        },
        removeArrayField(index) {
            // console.log('deletFunc', this.field.field.deletFunc);
            if (this.field.field.deletFunc && typeof this.field.field.deletFunc === 'function') {
                this.field.field.deletFunc.call(this, index);
            } else {
                this.value.splice(index, 1);
            }
            this.emitChangeEvent();
        },
        getShowState(field, data) {
            if (!field || field.hidden) {
                return false;
            }

            // array下面的object增加显隐控制
            if (field.type === 'object') {

                const type = typeof field.show;
                if (type === 'undefined') {
                    return true;
                } else if (type === 'string') {
                    return ams.utils.get(data, field.show);
                } else if (type === 'object') {
                    // eslint-disable-next-line eqeqeq
                    return ams.utils.get(data, field.show.name) == field.show.value;
                } else if (type === 'function') {
                    return field.show.call(this, data);
                }
            } else {
                return true;
            }
        }
    }
};
</script>

<style lang="scss">
.ams-array-simple-card {
    display: inline-block;
    height: auto;
    // 嵌套下面的array才显示边框
    .ams-array-simple-card {
        padding: 20px;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #fff;
    }
}

.ams-field-array-simple-item {
    position: relative;
    padding-right: 40px;
    .ams-field-array-simple-delete {
        position: absolute;
        z-index: 1;
        margin: 0;
        width: 25px;
        height: 100%;
        top: 0;
        right: 0;
        color: #F44242;
        font-size: 20px;
        i {
            cursor: pointer;
        }
    }

}
.el-form-item .ams-array-simple-item.el-form-item {
    margin-bottom: 22px;
    &:last-child{
        // 最后一个要重置为0，否则多层array和object嵌套会导致margin叠加空白
        margin-bottom: 0;
    }
}
</style>
