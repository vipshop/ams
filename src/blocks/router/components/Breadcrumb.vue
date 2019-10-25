<template>
    <!-- eslint-disable vue/valid-v-for-->
    <el-breadcrumb class="app-breadcrumb"
                   separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="'key' + index">
                <span v-if="(levelList.length > 1 && index == levelList.length - 1) || (!item.block && !item.redirect) || item.meta.noRedirect"
                      class="no-redirect">{{ item.name }}</span>
                <router-link v-else
                             :to="item.redirect || item.meta.path">{{ item.name }}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            levelList: null
        };
    },
    inject: ['$block'],
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    created() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            // console.log(this.$route)
            const router = this.$block.block.router;
            const levelList = [];
            if (this.$route.meta.index) {
                const index = this.$route.meta.index.split('.');
                let current = router.routes;
                for (let i = 0; i < index.length; i++) {
                    levelList.push(current[index[i]]);
                    current = current[index[i]].children;
                }
            }
            // 首个route作为默认首页加入所有面包屑
            if (router.defaultBreadcrumb !== false) {
                if (levelList[0] !== router.routes[0]) {
                    levelList.unshift(router.routes[0]);
                }
            }
            this.levelList = levelList;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb {
    font-size: 14px;
    line-height: 50px;
    padding-left: 15px;
    transition: margin-left 0.28s;
    position: absolute;
    top: 0;
    left: 50px;
    z-index: 2;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
    .el-breadcrumb__item a {
        color: #303133;
        font-weight: 700;
        &:hover {
            font-weight: 700;
            cursor: pointer;
            color: #303133;
        }
    }
}
</style>
