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
                'picture', 'split', 'time', 'clock2', 'marketing', 'funnel', 'pmd-logo',
                'attract', 'star', 'star2', 'fold', 'circle-square', 'circles', 't-shirt', 'trademark', 'handbag', 'bulb', 'warning',
                'data-sale', 'data-sale-7d', 'data-sun-black', 'data-mid', 'data-inventory', 'data-sale-x', 'data-footmark', 'data-price-field',
                'data-price', 'data-inventory-field', 'data-low-inventory', 'data-point-star', 'handbag2', 'precent',
                'lower-prices', 'petal', 'tag', 'caret-left', 'caret-right', 'caret-bottom', 'caret-bottom', 'caret-top', 
                'information', 'export', 'data', 'flat', 'top', 'bottom', 'ams', 'vis', 'man', 'woman', 'watcher', 'brick', 'heart', 'advocate',
                'crown', 'code', 'clock', 'car', 'star', 'edit', 'view', 'fixed', 'prohibit', 'balance', 'arrow-up', 'arrow-down', 'required', 'error',
                'circle-plus', 'search', 'document-check', 'check', 'data-footmark', 'data-percent', 'reset', 'big-arrow-up',
                'check2', 'close', 'data-line', 'dashboard', 'portrait', 'brand-equity', 'user-manager', 'account-sales', 'help', 'data-report',
                'customer-operation', 'question', 'user', 'mp', 'list-search', 'list-user', 'system-icon'
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