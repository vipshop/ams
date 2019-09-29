<template>
    <ul class="icon-list">
        <li><span><i class="ams-icon-watcher"></i><span class="icon-name">ams-icon-watcher</span></span></li>
        <li><span><i class="ams-icon-advocate"></i><span class="icon-name">ams-icon-advocate</span></span></li>
        <li><span><i class="ams-icon-fold"></i><span class="icon-name">ams-icon-fold</span></span></li>
        <li><span><i class="ams-icon-crown"></i><span class="icon-name">ams-icon-crown</span></span></li>
        <li><span><i class="ams-icon-heart"></i><span class="icon-name">ams-icon-heart</span></span></li>
        <li><span><i class="ams-icon-brick"></i><span class="icon-name">ams-icon-brick</span></span></li>
        <li><span><i class="ams-icon-dashboard"></i><span class="icon-name">ams-icon-dashboard</span></span></li>
        <li><span><i class="ams-icon-portrait"></i><span class="icon-name">ams-icon-portrait</span></span></li>
        <li><span><i class="ams-icon-brand-equity"></i><span class="icon-name">ams-icon-brand-equity</span></span></li>
        <li><span><i class="ams-icon-crowd-manage"></i><span class="icon-name">ams-icon-crowd-manage</span></span></li>
        <li><span><i class="ams-icon-account-sales"></i><span class="icon-name">ams-icon-account-sales</span></span></li>
        <li><span><i class="ams-icon-help-center"></i><span class="icon-name">ams-icon-help-center</span></span></li>
        <li><span><i class="ams-icon-data-report"></i><span class="icon-name">ams-icon-data-report</span></span></li>
        <li><span><i class="ams-icon-customer-operation"></i><span class="icon-name">ams-icon-customer-operation</span></span></li>
    </ul>
</template>

<script>
import '../../entry'

export default {
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