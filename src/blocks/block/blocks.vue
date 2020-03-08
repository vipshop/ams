<template>
    <div class="ams-blocks"
         v-if="blocks">
        <ams-block :key="name"
                   v-for="name in blocks"
                   :name="name" />
    </div>
</template>

<script>
export default {
    props: ['blocks']
};
</script>

<style lang="scss">
.ams-blocks {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    &-inline{
        display: inline-block;
        width: auto;
        margin-left: 7px;
    }
}
.ams-block {
    position: relative;
    width: 100%;
}
.ams-field .el-tag {
    margin-right: 6px;
    margin-bottom: 6px;
}
.el-form-item{
    .ams-field-rate-edit,
    .ams-field-rate-view {
        margin-top: 10px;
    }
}
</style>
