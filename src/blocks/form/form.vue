<template>
    <div v-if="ready"
         class="ams-block-form"
         :style="block.style">
        <el-form :model="data"
                 v-loading="loading"
                 v-on="on"
                 v-bind="block.props">
            <ams-blocks :blocks="block.slotBlocks.top" />
            <!--fields-->
            <template v-for="(fieldLayout, key) in layout">
                <template v-if="fieldLayout && getShowState(fields[key], data)">
                    <el-form-item v-if="typeof fieldLayout === 'string'"
                                  :key="key"
                                  :label-width="fields[key].labelWidth"
                                  :rules="fields[key].ctx === 'view' ? undefined : fields[key].rules"
                                  :prop="fields[key].type !== 'array' && fields[key].type !== 'object' ? key : ''">
                        <template v-if="fields[key].label" slot="label">
                            <el-tooltip effect="dark" placement="top" v-if="fields[key].info">
                                <i class="el-icon-info ams-form-label-info"></i>
                                <div slot="content" v-html="fields[key].info"></div>
                            </el-tooltip>
                            {{fields[key].label}}
                        </template>
                        <component :is="`ams-field-${fields[key].type}-${fields[key].ctx}`"
                                   :field="fields[key]"
                                   :value="data[key]"
                                   :ref="`$${key}`"
                                   :name="name"
                                   :path="key"
                                   :class="`ams-field ams-field-${fields[key].type}-${fields[key].ctx}`" />
                        <div class="ams-form-item-desc" v-if="fields[key].desc && fields[key].ctx === 'edit'" v-html="fields[key].desc"></div>
                    </el-form-item>
                    <el-form-item
                                  v-else
                                  :label-width="fields[key].labelWidth"
                                  class="ams-form-inline"
                                  :key="key">
                        <template v-if="fields[key].label" slot="label">
                            <el-tooltip effect="dark" placement="top" v-if="fields[key].info">
                                <i class="el-icon-info ams-form-label-info"></i>
                                <div slot="content" v-html="fields[key].info"></div>
                            </el-tooltip>
                            {{fields[key].label}}
                        </template>
                        <el-form-item v-for="fieldName in fieldLayout"
                                      :key="fieldName"
                                      :label="fieldName === key ? '' : fields[fieldName].label"
                                      :label-width="fields[fieldName].labelWidth"
                                      :rules="fields[fieldName].rules"
                                      :prop="fields[fieldName].type !== 'array' && fields[fieldName].type !== 'object' ? fieldName : ''">
                            <component :is="`ams-field-${fields[fieldName].type}-${fields[fieldName].ctx}`"
                                       :field="fields[fieldName]"
                                       :value="data[fieldName]"
                                       :ref="`$${fieldName}`"
                                       :name="name"
                                       :path="fieldName"
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

export default {
    mixins: [mixins.blockMixin, mixins.getShowState]
};
</script>

<style lang="scss">
.ams-form-inline {
    .el-form-item {
        display: inline-block;
        vertical-align: top;
        margin-right: 10px;
    }
}
.ams-form-label-info{
    margin-left: 2px;
    color: #888;
}
.ams-form-item-desc{
    line-height: 40px;
    font-size: 12px;
    color: #999;
}
</style>

