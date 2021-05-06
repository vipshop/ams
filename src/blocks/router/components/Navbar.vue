<template>
    <div class="ams-navbar">
        <hamburger :toggle-click="toggleSideBar"
                   :is-active="sidebar.opened"/>
        <div
            @click="handleLogoClick($block.data.logoPath)"
            :class="handleLogoClassNames"
            class="ams-logo"
        >
            <img class="ams-logo__img" v-if="$block.data.logo" :src="$block.data.logo">
            <h1 class="ams-logo__title">{{ $block.data.title }}</h1>
        </div>

        <ams-blocks :blocks="$block.block.slotBlocks['nav-left']" class="ams-navbar-slot-left"></ams-blocks>
        <!-- 左边 -->
        <div class="right-menu">
            <ams-blocks :blocks="$block.block.slotBlocks.nav"></ams-blocks>
            <template v-if="$block.data.userName">
                <img :src="$block.data.userImg || '//a.vpimg4.com/upload/upimg2/u/30ebcd58722a1fef7412f9e6431d6565.png'" class="avatar-img" >

                <el-dropdown trigger="hover" @command="handleCommand">
                    <span class="avatar-name">{{ $block.data.userName }} <i class="el-icon-caret-bottom"></i></span>
                    <el-dropdown-menu class="dropdown-menu-login-out" slot="dropdown">
                        <el-dropdown-item class="dropdown-item-login-out" command="login-out">{{ $block.data.loginOutText || '退出' }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>

        </div>
    </div>
</template>

<script>
import ams from '../../../ams/index';
import Hamburger from './Hamburger.vue';

export default {
    components: {
        Hamburger,
    },
    inject: ['$block'],
    props: ['sidebar'],
    computed: {
        /**
         * 处理 Logo 的场景类名
         */
        handleLogoClassNames() {
            const { logoPath = '' } = this.$block.data;

            return {
                'ams-logo--has-path': logoPath !== ''
            };
        },
    },
    methods: {
        toggleSideBar() {
            this.$parent.toggleSideBar();
        },
        handleCommand(command) {
            if (command === 'login-out') {
                ams.callAction.call(this.$block, '@loginOut');
            }
        },
        /**
         * 处理 Logo 点击跳转
         * @param {string} path 路由路径
         */
        handleLogoClick(path = '') {
            if (!path) return;

            this.$router.push({ path });
        }
    }
};
</script>

<style lang="scss">
.ams-navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    transition: margin-left 0.28s;
    .ams-navbar-slot-left {
        width: auto;
        display: inline-block;
    }
    .right-menu {
        float: right;
        height: 100%;
        font-size: 14px;
        &:focus {
            outline: none;
        }
        .login-out {
            padding: 0 20px;
            &:hover{
                opacity: 0.8;
            }
        }
        .el-dropdown {
            height: 40px;
        }
    }
    .avatar-img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
        margin-right: 5px;
        vertical-align: middle;
    }
    .avatar-name {
        display: inline-block;
        margin-right: 20px;
        vertical-align: middle;
        position: relative;
        z-index: 1;
        font-size: 14px;
    }
}
// 下拉样式调整
.el-dropdown-menu.dropdown-menu-login-out {
    padding: 6px 0;
    .dropdown-item-login-out{
        width: 80px;
        text-align: center;
    }
}


.ams-logo {
    display: inline-block;
    vertical-align: top;
    margin-right: 20px;
    height: 100%;
    &__img {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        padding: 5px 10px;
    }
    &__title {
        display: inline-block;
        vertical-align: top;
        margin: 0;
        font-size: 20px;
    }
    &--has-path {
        cursor: pointer;
    }
}
</style>
