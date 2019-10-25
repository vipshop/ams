<template>
    <router-view :key="key"
                 v-if="$route.meta.hasMenu === false || !showMenu" />
    <div :class="classObj"
         v-else>
        <navbar :sidebar="sidebar" />
        <sidebar class="sidebar-container"
                 :router="$block.block.router"
                 :sidebar="sidebar" />

        <!-- 面包屑 -->
        <breadcrumb v-if="shwoBreadcrumb" class="breadcrumb-container" />
        <!-- 主内容 -->
        <div class="main-container" :class="shwoBreadcrumb ? '' : 'main-container-nobreadcrumb'">
            <!-- <tags-view /> -->
            <section class="ams-router-main">
                <transition name="fade-transform"
                            mode="out-in">
                    <!-- <keep-alive :include="cachedViews"> -->
                    <router-view :key="key" />
                    <!-- </keep-alive> -->
                </transition>
            </section>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar/Sidebar';
import Breadcrumb from './Breadcrumb.vue';
// import ResizeMixin from './mixin/ResizeHandler'

export default {
    components: {
        Navbar,
        Sidebar,
        Breadcrumb,
        // TagsView
    },
    inject: ['$block'],
    data() {
        return {
            type: 'router',
            cachedViews: [],
            sidebar: {
                opened: true,
                withoutAnimation: false
            }
        };
    },
    // beforeCreate(){
    //     console.log(this.$options.router);
    // },
    // deactivated(){
    //     console.log('deactivated')
    // },
    // destroyed(){
    //     console.log('destroyed')
    // },
    // created(){
    //     console.log('created')
    // },
    computed: {
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                [this.currentRouter.class]: this.currentRouter.class ? true : false
            };
        },
        key() {
            return this.$route.fullPath;
        },
        currentRouter() {
            // 计算当前路由
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
            let current = {};
            if (levelList.length) {
                current = levelList[levelList.length - 1];
            }

            return current;
        },
        showMenu() {
            // 隐藏所以菜单配置项
            let router = this.$block.block.router;
            if (router && router.showMenu === false) {
                return false;
            } else {
                return true;
            }

        },
        shwoBreadcrumb() {
            if (this.$block.block.router && typeof this.$block.block.router.shwoBreadcrumb === 'undefined') {
                return true;
            }
            return this.$block.block.router.shwoBreadcrumb;
        }
    },
    methods: {
        toggleSideBar() {
            // console.log('toggleSideBar', this);
            this.sidebar.opened = !this.sidebar.opened;
        }
    }
};
</script>
