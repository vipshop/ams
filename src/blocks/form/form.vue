<template>
    <div v-if="ready"
         :class="'ams-block-form ' + (block.props['label-bold'] ? 'ams-block-form-label-bold' : '')"
         :style="block.style">
        <el-form :model="data"
                 v-loading="loading"
                 v-on="on"
                 v-on:keyup.enter.native="keyEnter"
                 v-bind="block.props">
            <ams-blocks :blocks="block.slotBlocks.top" />
            <!--fields-->
            <template v-for="(fieldLayout, key) in layout">
                <template v-if="fieldLayout && getShowState(fields[key], data)">
                    <el-form-item v-if="typeof fieldLayout === 'string'"
                                  :key="key"
                                  :label-width="fields[key].labelWidth"
                                  :class="fields[key].props && (fields[key].props.class ? fields[key].props.class : '') + ( fields[key].props.inline ? ' el-form-item-inline' : '')"
                                  :style="`width: ${fields[key].props && fields[key].props.formItemWidth}`"
                                  :rules="fields[key].ctx === 'view' ? undefined : fields[key].rules"
                                  :prop="fields[key].type !== 'array' && fields[key].type !== 'object' ? key : ''">
                        <template v-if="fields[key].label && fields[key].labelWidth !== '0'" slot="label">
                            <el-tooltip effect="dark" placement="top" v-if="fields[key].info">
                                <i :class="(fields[key].info.icon || 'el-icon-info') + ' ams-form-label-info'"></i>
                                <div slot="content" v-html="fields[key].info.content || fields[key].info"></div>
                            </el-tooltip>
                            {{fields[key].label}}
                        </template>
                        <component :is="`ams-field-${fields[key].type}-${fields[key].ctx}`"
                                   :field="getField(fields[key], data)"
                                   :value="data[key]"
                                   :ref="`$${key}`"
                                   :name="name"
                                   :path="key"
                                   :context="data"
                                   :class="`ams-field ams-field-${fields[key].type}-${fields[key].ctx}`" />
                        <div class="ams-form-item-desc" v-if="fields[key].desc && fields[key].ctx === 'edit'" v-html="fields[key].desc"></div>
                    </el-form-item>
                    <el-form-item
                                  v-else
                                  :label-width="fields[key].labelWidth"
                                  class="ams-form-inline"
                                  :key="key">
                        <template v-if="fields[key].label && fields[key].labelWidth !== '0'" slot="label">
                            <el-tooltip effect="dark" placement="top" v-if="fields[key].info">
                                <i class="el-icon-info ams-form-label-info"></i>
                                <div slot="content" v-html="fields[key].info"></div>
                            </el-tooltip>
                            {{fields[key].label}}
                        </template>
                        <el-form-item v-for="fieldName in fieldLayout"
                                      :key="fieldName"
                                      :label="fieldName === key && fields[fieldName].labelWidth !== '0' ? '' : fields[fieldName].label"
                                      :label-width="fieldName === key ? '0' : fields[fieldName].labelWidth"
                                      :rules="fields[fieldName].rules"
                                      :prop="fields[fieldName].type !== 'array' && fields[fieldName].type !== 'object' ? fieldName : ''">
                            <component :is="`ams-field-${fields[fieldName].type}-${fields[fieldName].ctx}`"
                                       :field="getField(fields[fieldName], data)"
                                       :value="data[fieldName]"
                                       :ref="`$${fieldName}`"
                                       :name="name"
                                       :path="fieldName"
                                       :context="data"
                                       :class="`ams-field ams-field-${fields[fieldName].type}-${fields[fieldName].ctx}`" />
                        </el-form-item>
                        <div class="ams-form-item-desc" v-if="fields[key].desc && fields[key].ctx === 'edit'" v-html="fields[key].desc"></div>
                    </el-form-item>
                </template>
                <ams-blocks v-if="block.slotBlocks['field:' + key]"
                            :blocks="block.slotBlocks['field:' + key]"
                            :key="key + 'Slot'" />
            </template>
            <el-form-item v-if="block.operationsCounts.operations">
                <ams-operations :name="name"
                                :context="data"></ams-operations>
            </el-form-item>
            <ams-blocks :blocks="block.blocks" />
        </el-form>
    </div>
</template>

<script>
import mixins from '../../ams/mixins';
import { getType } from '../../utils';

export default {
    mixins: [mixins.blockMixin, mixins.getField, mixins.getShowState],
    methods: {
        keyEnter(...args) {
            if (this.block.on
                && this.block.on['keyupEnter']
                && getType(this.block.on['keyupEnter']) === 'function'
            ) {
                this.block.on['keyupEnter'].call(this, ...args);
            }
        }
    }
};
</script>

<style lang="scss">
.ams-block-form .el-form-item-inline, .ams-form-inline .el-form-item {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
}
.ams-block-form-label-bold{
    .el-form-item__label{
        font-weight: bold
    }
}
.ams-form-label-info{
    margin-left: 2px;
    color: #888;
}
.ams-form-item-desc{
    line-height: 20px;
    padding-top: 7px;
    font-size: 12px;
    color: #999;
}
</style>

