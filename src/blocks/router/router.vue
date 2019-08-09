<template>
    <ams-router v-if="ready && routerReady"
                class="ams-block-router" />
</template>

<script>
import mixins from '../../ams/mixins';

export default {
    mixins: [mixins.blockMixin],
    data() {
        return {
            routerReady: false
        };
    }
};
</script>

<style lang="scss">
.ams-block-router {
    position: relative;
    height: 100%;
    width: 100%;
    &:after {
        content: "";
        display: table;
        clear: both;
    }
    // 主体区域
    .main-container {
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: 180px;
        position: relative;
    }
    // 侧边栏
    .sidebar-container {
        transition: width 0.28s;
        width: 180px !important;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out,
                0s padding-right ease-in-out;
        }
        .scrollbar-wrapper {
            overflow-x: hidden !important;
            .el-scrollbar__view {
                height: 100%;
            }
        }
        .el-scrollbar__bar.is-vertical {
            right: 0px;
        }
        .is-horizontal {
            display: none;
        }
        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }
        .svg-icon {
            margin-right: 16px;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
        .is-active > .el-submenu__title {
            color: #f4f4f5 !important;
        }
    }
    &.hideSidebar {
        .sidebar-container {
            width: 36px !important;
        }
        .main-container {
            margin-left: 36px;
        }
        .submenu-title-noDropdown {
            padding-left: 10px !important;
            position: relative;
            .el-tooltip {
                padding: 0 10px !important;
            }
        }
        .el-submenu {
            overflow: hidden;
            & > .el-submenu__title {
                padding-left: 6px !important;
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
        .el-menu {
            .el-menu-item{
                padding-left: 6px !important;
            }
            .el-tooltip{
                left: -14px !important;
            }
        }
    }
    .sidebar-container .nest-menu .el-submenu > .el-submenu__title,
    .sidebar-container .el-submenu .el-menu-item {
        min-width: 180px !important;
        background-color: #1f2d3d !important;
        &:hover {
            background-color: #001528 !important;
        }
    }
    .el-menu--collapse .el-menu .el-submenu {
        min-width: 180px !important;
    }
    &.withoutAnimation {
        .main-container,
        .sidebar-container {
            transition: none;
        }
    }
}

.ams-router-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
}
</style>
