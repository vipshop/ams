<template>
    <div class="ams-navbar">
        <hamburger :toggle-click="toggleSideBar"
                   :is-active="sidebar.opened"
                   class="hamburger-container" />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <ams-blocks :blocks="$block.block.slotBlocks.nav"></ams-blocks>
        </div>
    </div>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue';
import Hamburger from './Hamburger.vue';

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    inject: ['$block'],
    props: ['sidebar'],
    methods: {
        toggleSideBar() {
            this.$parent.toggleSideBar();
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.ams-navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container {
        float: left;
    }
    .right-menu {
        float: right;
        height: 100%;
        &:focus {
            outline: none;
        }
    }
}
</style>
