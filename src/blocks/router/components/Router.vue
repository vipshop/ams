<template>
    <router-view :key="key"
                 v-if="$route.meta.hasMenu === false || !showMenu" />
    <div :class="classObj"
         v-else>
        <sidebar class="sidebar-container"
                 :router="$block.block.router"
                 :sidebar="sidebar" />
        <div class="main-container">
            <navbar :sidebar="sidebar" />
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
// import ResizeMixin from './mixin/ResizeHandler'

export default {
    components: {
        Navbar,
        Sidebar,
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
                withoutAnimation: this.sidebar.withoutAnimation
            };
        },
        key() {
            return this.$route.fullPath;
        },
        showMenu() {
            // 隐藏所以菜单配置项
            let router = this.$block.block.router;
            if (router.showMenu && router.showMenu === false) {
                return false;
            } else {
                return true;
            }

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
