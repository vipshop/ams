<template>
    <div>
        <el-breadcrumb class="ams-dev-breadcrumb"
                       separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
                <router-link to="/">物料列表</router-link>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <div class="maretial-list">
            <div class="title">区块（block）</div>
            <el-card shadow="hover"
                     v-for="block in blocks"
                     :key="block.name">
                <router-link :to="`/detail?name=${block.name}&type=block`"/>
                {{block.description || block.name}}
                <div class="name">
                {{block.name}}
                </div>
            </el-card>
        </div>
        <div class="maretial-list">
            <div class="title">字段（field）</div>
            <el-card shadow="hover"
                     v-for="field in fields"
                     :key="field.name">
                <router-link :to="`/detail?name=${field.name}&type=field`"/>
                {{field.description || field.name}}
                <div class="name">
                {{field.name}}
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
let context = require.context('../../packages', true, /^\.\/(?:block|field)-[\w-]+\/package\.json$/);

export default {
    data() {
        return {
            blocks: [],
            fields: []
        };
    },
    created() {
        context.keys().forEach(key => {
            // console.log(key);
            let pkg = context(key);
            // console.log(pkg);
            let isField;
            if (typeof pkg.isField === 'undefined') {
                isField = /^@ams-team\/field-/.test(pkg.name);
                pkg.isField = isField;
            }
            pkg.name = pkg.name.replace(/^@ams-team\/(?:block|field)\-/, '');
            if (pkg.amsConfig.publish !== false) {
                if (isField || pkg.isField) {
                    this.fields.push(pkg);
                } else {
                    this.blocks.push(pkg);
                }
            }
        });
    }
};
</script>

<style lang="scss">
.maretial-list{
    overflow: hidden;
    .title{
        margin: 20px 0;
        font-size: 16px;
        line-height: 2em;
        font-weight: bold;
        color: #2c3e50;
    }
    .el-card{
        float: left;
        width: 300px;
        height: 90px;
        margin: 10px;
        color: #409eff;
        line-height: 1.2em;
        position: relative;
        cursor: pointer;
        a{
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
    }
    .name{
        margin-top: 10px;
        color: #999;
    }
}
</style>
