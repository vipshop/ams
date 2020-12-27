<template>
    <div class="ams-navbar">
        <hamburger :toggle-click="toggleSideBar"
                   :is-active="sidebar.opened"/>
        <img class="logo" v-if="$block.data.logo" :src="$block.data.logo">
        <h1>{{ $block.data.title }}</h1>

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
    methods: {
        toggleSideBar() {
            this.$parent.toggleSideBar();
        },
        handleCommand(command) {
            if (command === 'login-out') {
                console.log('loginOutClick');
                ams.callAction.call(this.$block, '@loginOut');
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.ams-navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    transition: margin-left 0.28s;
    .logo{
        height: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        vertical-align: top;
    }
    h1{
        display: inline-block;
        vertical-align: top;
        margin: 0;
        font-size: 20px;
        margin-right: 20px;
    }
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
        // &::after {
        //     content: '';
        //     width: 1px;
        //     height: 12px;
        //     position: absolute;
        //     z-index: 2;
        //     right: -20px;
        //     top: 50%;
        //     margin-top: -6px;
        //     background-color: #000;
        // }
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

/**
 * 解决使用该区块导致和 Element UI 图片组件放大预览功能样式冲突的问题
 */
.el-image-viewer__close {
  top: 104px!important;
}
</style>
