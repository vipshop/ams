<template>
    <div class="ams-doc-index">
        <img class="logo"
             src="https://h5rsc.vipstatic.com/ams/ams-logo.png">
        <div class="title">AMS</div>
        <div class="sub-title">基于配置的管理后台解决方案</div>
        <div class="btns">
            <a rel="noopener noreferrer"
               class="start"
               href="javascript:"
               @click="go">起步</a>
            <a rel="noopener noreferrer"
               class="git"
               target="_blank"
               href="//github.com/vipshop/ams">GITHUB</a>
        </div>

        <div class="figure figure-1">
            <div class="figure-title">海量物料市场</div>
            <div class="res-list">
                <div class="item">
                    <div class="name">区块</div>
                    <img class="a" :src="a1">
                </div>
                <div class="item">
                    <div class="name">字段</div>
                    <img class="a" :src="a2">
                </div>
                <div class="item">
                    <div class="name">定制</div>
                    <img class="a" :src="a3">
                </div>
                <div class="item">
                    <div class="name">模板</div>
                    <img class="a" :src="a4">
                </div>
            </div>
            <img class="arr arr1" :src="arr1">
            <img class="arr arr2" :src="arr1">
        </div>

        <div class="figure figure-2">
            <div class="figure-title">灵活简单配置</div>
            <div class="config-list">
                <div class="item">
                    <div class="name">配置规则</div>
                    <img class="b" :src="b1">
                </div>
                <div class="item">
                    <div class="name">可视化</div>
                    <img class="b" :src="b2">
                </div>
            </div>
            <img class="arr" :src="arr2">
        </div>

        <div class="figure figure-3">
            <div class="figure-title">构建强大后台</div>
            <div class="ans">
                <div class="item">
                    <img class="c c1" :src="c1">
                    <img class="c c2" :src="c2">
                    <img class="c c3" :src="c3">
                    <img class="c c4" :src="c4">
                    <img class="c c5" :src="c5">
                    <img class="c c6" :src="c6">
                    <!-- <img class="c c7" :src="c7"> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            arr1: require('../../assets/index/arr1.png'),
            arr2: require('../../assets/index/arr2.png'),

            a1: require('../../assets/index/chart3.png'),
            a2: require('../../assets/index/field.png'),
            a3: require('../../assets/index/chart1.png'),
            a4: require('../../assets/index/router.png'),

            b1: require('../../assets/index/config.png'),
            b2: require('../../assets/index/editor-view.png'),

            c1: require('../../assets/index/admin1.png'),
            c2: require('../../assets/index/chart2.png'),
            c3: require('../../assets/index/field-normal.png'),
            c4: require('../../assets/index/chart4.png'),
            c5: require('../../assets/index/table.png'),
            c6: require('../../assets/index/chart5.png'),
            // c7: require('../../assets/index/chart5.png'),
        }
    },
    methods:{
        go(){
            location.href = '/api/'
        }
    }
}
</script>

