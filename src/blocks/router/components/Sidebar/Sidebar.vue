<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu :show-timeout="router['showTimeout'] || 200"
                 :hide-timeout="router['hideTimeout'] || 100"
                 :default-active="$route.path"
                 :collapse="isCollapse"
                 :unique-opened="uniqueOpened"
                 mode="vertical"
                 :background-color="router['backgroundColor']"
                 :text-color="router['textColor']"
                 :active-text-color="router['activeTextColor']">

            <ams-blocks :blocks="$block.block.slotBlocks.menuTop"></ams-blocks>

            <sidebar-item v-for="route in routes"
                          :key="route.path"
                          :item="route" />

            <ams-blocks :blocks="$block.block.slotBlocks.menuBottom"></ams-blocks>

        </el-menu>
    </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem';

export default {
    components: { SidebarItem },
    props: {
        router: {
            type: Object,
            required: true
        },
        sidebar: {
            type: Object,
            required: true
        }
    },
    inject: ['$block'],
    computed: {
        uniqueOpened() {
            if (this.$block.block.router && this.$block.block.router.uniqueOpened) {
                return true;
            } else {
                return false;
            }
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        routes() {
            const routes = this.getRoutes(this.router.routes, this.$block.data.roles);
            // console.log(routes, this.router.routes);
            return routes;
        }
    },
    methods: {
        checkRoles(route, roles) {
            // console.log(route.meta.roles, 'route.meta.roles', roles);
            if (!route.meta.roles) {
                return true;
            } else {
                if (!roles || !roles.length) {
                    return false;
                }
                for (let i = 0; i < route.meta.roles.length; i++) {
                    if (roles.indexOf(route.meta.roles[i]) >= 0) {
                        return true;
                    }
                }
                return false;
            }

        },
        getRoutes(list, roles) {
            // console.log('list', list)
            const arr = [];
            if (!list) {
                return;
            }
            for (let i = 0; i < list.length; i++) {
                if (!list[i].meta.hidden && this.checkRoles(list[i], roles)) {
                    const route = {
                        ...list[i],
                        children: this.getRoutes(list[i].children, roles)
                    };
                    arr.push(route);
                }
            }
            return arr;
        }
    }
};
</script>
