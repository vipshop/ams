<template>
    <div class="ams-doc-index">
        <div class="ams-doc-index-main">
            <img class="logo"
                src="https://h5rsc.vipstatic.com/ams/ams-logo.png">
            <div class="title">AMS</div>
            <div class="sub-title">基于配置的管理后台解决方案</div>
            <div class="btns">
                <a rel="noopener noreferrer"
                class="start"
                href="javascript:"
                @click="go">开始使用</a>
                <a class="button gray has-icon" href="https://github.com/vipshop/ams" target="_blank">
                    <svg aria-labelledby="simpleicons-github-dark-icon" lang="" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub Dark icon</title><path fill="#7F8C8D" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>

                    GITHUB
                </a>
                <!-- <iframe src="https://ghbtns.com/github-btn.html?user=vipshop&repo=ams&type=star&count=true&size=large" frameborder="0" scrolling="0" width="150px" height="30px"></iframe> -->
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
                    </div>
                </div>
            </div>
        </div>
        
        <footer class="footer">
            <div class="footer-item">
                <h4>链接</h4>
                <a href="https://github.com/vipshop/ams" target="_blank">代码仓库</a>
                <a href="/ams/market/">市场</a>
                <a href="/ams/version/VERSION.html">更新日志</a>
            </div>
             <div class="footer-item">
                <h4>工具</h4>
                <a href="/ams/api/cli.html">脚手架</a>
            </div>
            <div class="footer-item">
                <h4>社区</h4>
                <a href="https://github.com/vipshop/ams/issues" target="_blank">反馈建议</a>
            </div>
        </footer>
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
            location.href = '/ams/api/'
        }
    }
}
</script>

