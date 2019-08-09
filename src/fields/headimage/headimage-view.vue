<template>
    <div :style="field.style">
        <img :src="viewValue"
             v-if="viewValue" />
        <i class="el-icon-picture"
           v-else></i>
    </div>
</template>

<script>

import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.fieldViewMixin]
};
</script>

<style lang="scss">
.ams-field-headimage-view {
    display: block;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    position: relative;
    width: 100px;
    height: 100px;
    line-height: 100px;
    overflow: hidden;
    &:hover {
        border-color: #409eff;
    }
    img {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
    }
}
</style>

