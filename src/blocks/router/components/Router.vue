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
        <breadcrumb v-if="showBreadcrumb" class="breadcrumb-container" />
        <!-- 主内容 -->
        <div class="main-container" :class="showBreadcrumb ? '' : 'main-container-nobreadcrumb'">
            <!-- <tags-view /> -->
            <section class="ams-router-main">
                <transition name="fade-transform"
                            mode="out-in">
                    <keep-alive v-if="keepAlive">
                        <router-view :key="key" />
                    </keep-alive>
                    <router-view v-else :key="key" />
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
        /**
         * 添加 $route 的 case，方便理解代码
         *
         * $route: {
            "name": "报表",
            "meta": {
                "index": "5.0.0",
                "path": "/cases-block/list/student-report"
            },
            "path": "/cases-block/list/student-report",
            "hash": "",
            "query": {},
            "params": {},
            "fullPath": "/cases-block/list/student-report",
            "matched": [
                {
                    "path": "/cases-block/list/student-report",
                    "regex": {
                        "keys": []
                    },
                    "components": {},
                    "instances": {},
                    "name": "报表",
                    "meta": {
                        "index": "5.0.0",
                        "path": "/cases-block/list/student-report"
                    },
                    "props": {
                        "default": {
                            "name": "student-report"
                        }
                    }
                }
            ]
         }
         */
        keepAlive() {
            return this.$block.block.router.keepAlive;
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
        showBreadcrumb() {
            const showBreadcrumb = this.$block.block.router.showBreadcrumb || this.$block.block.router.shwoBreadcrumb;
            if (this.$block.block.router && typeof showBreadcrumb === 'undefined') {
                return true;
            }
            return showBreadcrumb;
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
