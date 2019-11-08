<template>
    <ul class="icon-list">
        <li v-for="icon in icons">
            <span><i :class="['ams-icon-' + icon]"></i><span class="icon-name">ams-icon-{{ icon }}</span></span>
        </li>
    </ul>
</template>

<script>
import '../../entry'

export default {
    data() {
        return {
            icons: [
                'user', 'woman', 'man', 'question', 'watcher', 'advocate', 'fold', 'crown', 'heart', 'brick', 'dashboard',
                'portrait', 'brand-equity', 'crowd-manage', 'account-sales', 'help-center', 'data-report', 'customer-operation'
            ]
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0!important;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 14px;
    color: #5e6d82;
    line-height: 2em;
    display: grid;
        grid-template-columns: repeat(6, 1fr);
    li {
        float: left;
        // width: 16.75%;
        text-align: center;
        height: 120px;
        line-height: 120px;
        color: #666;
        font-size: 13px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        span, &::after{
            display: inline-block;
            vertical-align: middle;
        }
        span {
            line-height: normal;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
            color: #99a9bf;
            transition: color .15s linear;
        }
        i {
            display: block;
            font-size: 32px;
            margin-bottom: 15px;
            color: #606266;
            transition: color .15s linear;
        }
        .icon-name {
            display: inline-block;
            padding: 0 3px;
            height: 1em;
        }
        &:hover {
            i, span {
                color: #3eaf7c;
            }
        }
    }
}
</style>