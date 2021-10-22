<template>
    <div class="menu-wrapper">

        <el-submenu ref="submenu"
                    v-if="item.children && item.children.length"
                    :index="resolvePath(item).path">
            <template slot="title">
                <i :class="iconClassName(item.meta.icon)"
                v-if="item.meta.icon"></i>
                <span slot="title"
                    v-if="item.name">{{item.name}}</span>
            </template>

            <template v-for="child in item.children">
                <sidebar-item v-if="child.children && child.children.length > 0"
                              :is-nest="true"
                              :item="child"
                              :key="child.path"
                              class="nest-menu" />

                <app-link v-else
                          :to="resolvePath(child)"
                          :key="child.name">
                    <el-tooltip placement="right-start" :disabled="!child.tooltip" v-bind="child.tooltip">
                        <el-menu-item :index="resolvePath(child).path" @click="clickItem(child)">
                            <i :class="iconClassName(child.meta.icon)"
                            v-if="child.meta.icon"></i>
                            <span slot="title"
                                v-if="child.name">{{child.name}}</span>
                        </el-menu-item>
                    </el-tooltip>
                </app-link>
            </template>
        </el-submenu>
        <app-link :to="resolvePath(item)"
                  v-else>
            <el-tooltip placement="right-start" :disabled="!item.tooltip" v-bind="item.tooltip">
                <el-menu-item :index="resolvePath(item).path" @click="clickItem(item)">
                    <i :class="iconClassName(item.meta.icon)"
                    v-if="item.meta.icon"></i>
                    <span slot="title"
                        v-if="item.name">{{item.name}}</span>
                </el-menu-item>
            </el-tooltip>
        </app-link>

    </div>
</template>

<script>
import { isExternal } from '../../../../utils';
import AppLink from './Link';
// import FixiOSBug from './FixiOSBug'

export default {
    name: 'SidebarItem',
    components: { AppLink },
    //   mixins: [FixiOSBug],
    props: {
        // route object
        item: {
            type: Object,
            required: true
        }
    },
    inject: ['$block'],
    methods: {
        resolvePath(item) {
            const to = {
                target: item.target || '_blank'
            };
            if (this.isExternalLink(item.path)) {
                to.path = item.path;
                return to;
            }
            to.path = item.redirect || item.meta.path;
            to.replace = item.replace;
            return to;
        },
        isExternalLink(routePath) {
            return isExternal(routePath);
        },
        iconClassName(icon) {
            if (icon && !/^(el\-icon|ams-icon).+/.test(icon)) {
                // !!!!! 废弃提示 !!!!!
                console.warn('路由icon的简写已在ams@0.15.11+废弃，请使用 el-icon-iconName 的完整类名替代，如：  \nmeta: {icon: "el-icon-menu"}');
                return `el-icon-${icon}`;
            }
            return icon;
        },
        clickItem(item) {
            if (this.$block.block.router && !this.$block.block.router.forcedRefresh || item.meta.path !== this.$route.path || this.isExternalLink(item.path)) {
                return;
            }
            this.$router.push({
                path: '/amsblankpage',
                query: {
                    url: this.$route.fullPath
                }
            });
        }
    }
};
</script>
