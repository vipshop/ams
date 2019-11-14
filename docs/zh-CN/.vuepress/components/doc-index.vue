<template>
    <div class="ams-doc-index" style="margin-top:-2rem">
        <div class="ams-doc-index-banner">
            <div class="ams-doc-index-banner-left"></div>
            <div class="banner-main">
                <h1>AMS</h1>
                <h2>面向管理后台的物料系统</h2>
                <h3>ADMIN MATERIAL SYSTEM</h3>
                <p>
                    AMS是基于JSON配置来搭建后台管理系统页面的前端框架；<br/>
                    使用它，能快速构建前端页面，提升页面开发效率。
                </p>
                <div class="banner-main-btns">
                    <a rel="noopener noreferrer"
                        class="start"
                        href="/ams/api/"></a>
                    <a rel="noopener noreferrer"
                        class="git"
                        target="_blank"
                        href="https://github.com/vipshop/ams"></a>
                </div>
            </div>
            <div class="ams-doc-index-banner-right1"></div>
            <div class="ams-doc-index-banner-right2">
                <span class="s1"></span>
                <span class="s2"></span>
                <span class="s3"></span>
                <span class="s4"></span>
                <span class="s5"></span>
            </div>
            <div class="ams-doc-index-banner-right3">
                <span class="s1"></span>
                <span class="s2"></span>
                <span class="s3"></span>
                <span class="s4"></span>
                <span class="s5"></span>
                <span class="s6"></span>
            </div>
        </div>
        <div class="ams-doc-index-main">
            <div class="figure figure-1" ref="figure1">
                <div class="figure-title">三步轻松搞定后台</div>
                <div class="res-list">
                    <div class="item step1">
                        <div class="img"></div>
                        <div class="name">海量物料</div>
                        <div class="subname">STEP 1</div>
                        <p>选取所需字段、区块、模板</p>
                    </div>
                    <div class="item step2">
                        <div class="img"></div>
                        <div class="name">灵活配置</div>
                        <div class="subname">STEP 2</div>
                        <p>可视化配置、代码级配置</p>
                    </div>
                    <div class="item step3">
                        <div class="img"></div>
                        <div class="name">快速构建</div>
                        <div class="subname">STEP 3</div>
                        <p>支持多种系统接入方式</p>
                    </div>
                </div>
            </div>
            <br/><br/><br/><br/><br/>
            <div class="figure figure-2" ref="figure2">
                <div class="figure-title">海量物料</div>
                <div class="config-list">
                    <a href="/ams/field/" class="item item1">
                        <span class="s1"></span>
                        <span class="s2"></span>
                        <span class="s3"></span>
                        <span class="s4">40</span>
                        <span class="s5">基础字段</span>
                        <P>页面的基本组成单元（例如：文本框、按钮等）</P>
                    </a>
                    <a href="/ams/block/" class="item item2">
                        <span class="s1"></span>
                        <span class="s2"></span>
                        <span class="s3"></span>
                        <span class="s4">30</span>
                        <span class="s5">通用区块</span>
                        <P>若干字段与交互组成的功能单元（例如：Form表单、List列表）</P>
                    </a>
                    <a href="/ams/market/" class="item item3">
                        <span class="s1"></span>
                        <span class="s2"></span>
                        <span class="s3"></span>
                        <span class="s4">20</span>
                        <span class="s5">精选模板</span>
                        <P>若干区块与交互组成的页面集合（例如：具有增删改查功能的页面）</P>
                    </a>
                </div>
            </div>
        </div>
        
        <footer class="footer">
            <div class="footer-main">
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
                <div class="ewm">
                    加入技术支持群，请扫二维码加“唯技术”老师咨询<br/>
                    （添加时请备注“AMS”）
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    // 在页面刚加载好时注册此行为
    mounted() {
        window.addEventListener("scroll", this.onWindowScroll);
    },

    // 在页面卸载时删除此行为 （比如模板切换、路由切换等）
    destroyed() {
        window.removeEventListener("scroll", this.onWindowScroll);
    },
    methods: {
        onWindowScroll() {
            // console.log("发现窗口滚动，请注意节流");
            // 注册一下有哪些元素是进入视野才动画出现，这里用到了之前html里的ref
            this.isInSee(this.$refs.figure1);
            this.isInSee(this.$refs.figure2);
        },
        isInSee(el) {
            const clientRect = el.getBoundingClientRect();
            if (clientRect.top < 0 || (clientRect.bottom > 0 && clientRect.top <= window.innerHeight/2)) {
                el.classList.add('show')
            } else if(clientRect.bottom < 0 || clientRect.top > window.innerHeight) {
                el.classList.remove('show')
            }
        }
    },
}
</script>
<style lang="scss">
@keyframes showBanner {
    0% {
        opacity: 0;
    }
    5% {
        opacity: 1;
    }
    30% {
        opacity: 1;
    }
    35% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
}
@keyframes fadeInUp {
    0% {
        opacity: 0.5;
        transform: translate3d(0, 3%, 0);
    }

    100% {
        opacity: 1;
        transform: none;
    }
}
@keyframes moveToUp {
    0% {
        transform: translate3d(0, 15%, 0);
    }

    100% {
        transform: none;
    }
}
@keyframes moveToLeft {
    0% {
        transform: translate3d(15%, 0, 0);
    }

    100% {
        transform: none;
    }
}
@keyframes moveToRight {
    0% {
        transform: translate3d(-15%, 0, 0);
    }

    100% {
        transform: none;
    }
}
@keyframes upAndDown {
    0%,100% {
        transform: translate3d(0, 5%, 0);
    }

    50% {
        transform: translate3d(0, -5%, 0);
    }
}
@keyframes showAndHide {
    0%,100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.ams-doc-index{
    width: 100%;
    overflow: hidden;
    min-width: 1220px;
}
.ams-doc-index-banner{
    height: 768px;
    width: 1920px;
    left: 50%;
    transform: translateX(-50%);
    background-image: url('/ams/index/banner-bg.png');
    background-position: center;
    position: relative;
    z-index: 1;
    margin-bottom: 60px;
    &::after{
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        background-image: url('/ams/index/banner-bg2.png');
        background-position: center;
    }
    &-left{
        width: 163px;
        height: 435px;
        position: absolute;
        top: 170px;
        left: 0;
        z-index: 1;
        background-image: url('/ams/index/banner-left.png');
        animation: fadeInUp ease-out 0.8s both;
    }
    &-right1{
        width: 127px;
        height: 170px;
        top: 130px;
        right: 385px;
        position: absolute;
        z-index: 2;
        background-size: 100%;
        background-image: url('/ams/index/banner-right01.png');
        animation: fadeInUp ease-out 0.8s 0.6s both;
    }
    &-right2{
        width: 452px;
        height: 446px;
        position: absolute;
        top: 110px;
        right: 0;
        z-index: 3;
        background-image: url('/ams/index/banner-right02.png');
        background-size: 100%;
        animation: fadeInUp ease-out 0.8s 0.3s both;
        span{
            position: absolute;
            background-size: 100%;
        }
        .s1{
            width: 68px;
            height: 148px;
            top: 28px;
            left: 315px;
            background-image: url('/ams/index/banner-right02-04.png');
        }
        .s2{
            width: 68px;
            height: 118px;
            top: 88px;
            left: 270px;
            background-image: url('/ams/index/banner-right02-02.png');
        }
        .s3{
            width: 68px;
            height: 97px;
            top: 138px;
            left: 225px;
            background-image: url('/ams/index/banner-right02-03.png');
        }
        .s4{
            width: 148px;
            height: 172px;
            top: -10px;
            left: 80px;
            background-image: url('/ams/index/banner-right02-05.png');
            background-repeat: no-repeat;
            animation: upAndDown ease-in-out 4.5s 1s infinite both;
        }
        .s5{
            width: 360px;
            height: 310px;
            top: -50px;
            left: 74px;
            background-image: url('/ams/index/banner-right02-01.png');
            animation: showAndHide ease-in-out 4.5s 1s infinite both;
        }
    }
    &-right3{
        width: 565px;
        height: 710px;
        position: absolute;
        top: 107px;
        right: 300px;
        z-index: 4;
        background-image: url('/ams/index/banner-right03.png');
        background-size: 100%;
        animation: fadeInUp ease-out 0.8s both;
        span{
            position: absolute;
            background-size: 100%;
        }
        .s1,.s2,.s3,.s4{
            width: 305px;
            height: 385px;
            top: 31px;
            left: 122px;
            opacity: 0;
        }
        .s1{
            background-image: url('/ams/index/banner-right03-03.png');
            animation: showBanner 20s 0s infinite;
        }
        .s2{
            background-image: url('/ams/index/banner-right03-04.png');
            animation: showBanner 20s 5s infinite;
        }
        .s3{
            background-image: url('/ams/index/banner-right03-05.png');
            animation: showBanner 20s 10s infinite;
        }
        .s4{
            background-image: url('/ams/index/banner-right03-06.png');
            animation: showBanner 20s 15s infinite;
        }
        .s5{
            width: 152px;
            height: 249px;
            top: 223px;
            left: 85px;
            background-image: url('/ams/index/banner-right03-01.png');
        }
        .s6{
            width: 182px;
            height: 234px;
            top: 310px;
            left: 200px;
            background-image: url('/ams/index/banner-right03-02.png');
        }
    }
}
.banner-main{
    width: 1220px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    font-family:PingFangSC-Medium,PingFangSC;
    padding-top: 140px;
    h1{
        color: #fff;
        font-size: 100px;
        margin: 0;
        line-height: 1;
        padding-left: 20px;
    }
    h2{
        color: #67EEDF;
        font-size: 34px;
        margin: 0;
        border-bottom: 0;
        padding-left: 20px;
    }
    h3{
        color: #C2BBDD;
        margin: 0;
        font-size: 18px;
        font-weight:400;
        position: relative;
        z-index: 1;
        padding-left: 20px;
        letter-spacing: 3px;
        &::after{
            content: '';
            position: absolute;
            z-index: 2;
            left: 20px;
            bottom: -10px;
            width: 45px;
            height: 5px;
            border-radius:1px;
            background-color: #14F2D5;
        }
    }
    p{
        color: #C2BBDD;
        font-size: 22px;
        line-height:30px;
        margin: 40px 0 65px;
        padding-left: 20px;
    }
}
.banner-main-btns{
    a {
        display: inline-block;
        width: 270px;
        height: 106px;
        background-size: 100%;
        &:hover{
            opacity: 0.8;
        }
    }
    .start{
        background-image: url('/ams/index/start.png');
    }
    .git{
        background-image: url('/ams/index/github.png');
    }
}

.ams-doc-index-main {
    max-width: 1220px;
    margin: auto;
    font-family: FZLTHJW--GB1-0,FZLTHJW--GB1;
    text-align: center;
    .figure {
        position: relative;
        .figure-title{
            font-size:48px;
            text-align: center;
            font-weight:normal;
            color:rgba(79,64,59,1);
            line-height:55px;
            background-size: 236px;
            background-repeat: no-repeat;
            background-position: bottom center;
            padding-bottom:25px; 
            margin-bottom: 50px;
        }
        
    }
    .figure-1{
        .figure-title{
            background-image: url('/ams/index/figure-01.png');
        }
        &.show{
            .item{
                .img{
                    animation: moveToUp ease-out 0.6s 0s both;
                    &::after{
                        animation: moveToUp ease-out 0.6s 0.3s both;
                    }
                }
            }
        }
    }
    .figure-2{
        .figure-title{
            background-image: url('/ams/index/figure-02.png');
        }
        &.show{
            .item1{
                animation: moveToUp ease-out 0.6s 0s both;
                .s2{
                    animation: moveToRight ease-out 0.6s 0.4s both;
                }
                .s3{
                    animation: moveToUp ease-out 0.6s 0.4s both;
                }
            }
            .item2{
                animation: moveToUp ease-out 0.6s 0.4s both;
                .s2{
                    animation: moveToLeft ease-out 0.6s 0.8s both;
                }
                .s3{
                    animation: moveToUp ease-out 0.6s 0.8s both;
                }
            }
            .item3{
                animation: moveToUp ease-out 0.6s 1.2s both;
                .s2{
                    animation: moveToRight ease-out 0.6s 1.6s both;
                }
                .s3{
                    animation: moveToUp ease-out 0.6s 1.6s both;
                }
            }
        }
    }
}
.res-list{
    display: flex;
    .item{
        flex: 1;
        position: relative;
        z-index: 1;
        .img{
            width: 131px;
            height: 158px;
            margin: 0 auto 20px;
            z-index: 1;
            position: relative;
            background-repeat: no-repeat;
            transform: translate3d(0, 15%, 0);
            &::after{
                content: '';
                position: absolute;
                z-index: 2;
                width: 128px;
                height: 131px;
                bottom: 0;
                right: -50px;
                background-repeat: no-repeat;
                transform: translate3d(0, 15%, 0);
            }
        }
        .name{
            font-size:30px;
            line-height: 35px;
            color: #4F403B;
        }
        .subname{
            color: #62E3D1;
        }
        p{
            font-size:22px;
            color: #999;
            line-height: 26px;
        }
        &.step1{
            .img{
                background-image: url('/ams/index/figure-01-1.png');
                &::after{
                    background-image: url('/ams/index/figure-01-2.png');
                }
            }
        }
        &.step2{
            .img{
                background-image: url('/ams/index/figure-01-3.png');
                background-position: 0 15px;
                &::after{
                    height: 76px;
                    bottom: 10px;
                    background-image: url('/ams/index/figure-01-4.png');
                }
            }
        }
        &.step1,&.step2{
            &::after{
                content: '';
                width: 20px;
                height: 31px;
                position: absolute;
                z-index: 2;
                right: -10px;
                top: 50%;
                margin-top: -15px;
                background-image: url('/ams/index/figure-01-7.png');
            }
        }
        &.step3{
            .img{
                background-image: url('/ams/index/figure-01-5.png');
                background-position: 0 15px;
                &::after{
                    right: 20px;
                    bottom: -10px;
                    background-image: url('/ams/index/figure-01-6.png');
                }
            }
        }
    }
}

.config-list{
    padding-bottom: 40px;
    .item{
        display: block;
        width: 1219px;
        height: 290px;
        position: relative;
        z-index: 1;
        margin-bottom: 30px;
        span{
            position: absolute;
            z-index: 2;
            background-repeat: no-repeat;
            &.s1{
                width: 344px;
                height: 316px;
            }
            &.s4{
                font-size: 116px;
                color: #fff;
                &::after{
                    content: '+';
                    position: absolute;
                    top: 21px;
                    right: -26px;
                    color: #fff;
                    font-size: 40px;
                }
            }
            &.s5{
                font-size: 50px;
                color: #fff;
            }
        }
        p{
            color: #fff;
            position: absolute;
            z-index: 2;
            font-size: 26px;
        }
        &.item1{
            background-image: url('/ams/index/figure-02-1.png');
            .s1{
                right: 40px;
                bottom: 12px;
                background-image: url('/ams/index/figure-02-2.png');
            }
            .s2{
                width: 136px;
                height: 136px;
                right: 240px;
                bottom: 100px;
                background-image: url('/ams/index/figure-02-3.png');
            }
            .s3{
                width: 225px;
                height: 87px;
                right: 70px;
                bottom: 55px;
                background-image: url('/ams/index/figure-02-4.png');
            }
            .s4{
                left: 68px;
                top: 42px;
            }
            .s5{
                left: 210px;
                top: 113px;
            }
            p{
                top: 149px;
                left: 72px;
            }
        }
        &.item2{
            background-image: url('/ams/index/figure-02-5.png');
            .s1{
                left: 40px;
                bottom: 5px;
                background-image: url('/ams/index/figure-02-6.png');
            }
            .s2{
                width: 146px;
                height: 152px;
                left: 230px;
                bottom: 80px;
                background-image: url('/ams/index/figure-02-7.png');
            }
            .s3{
                width: 201px;
                height: 70px;
                left: 80px;
                bottom: 60px;
                background-image: url('/ams/index/figure-02-8.png');
            }
            .s4{
                right: 260px;
                top: 35px;
            }
            .s5{
                right: 58px;
                top: 100px;
            }
            p{
                top: 149px;
                right: 45px;
            }
        }
        &.item3{
            background-image: url('/ams/index/figure-02-1.png');
            .s1{
                right: 40px;
                bottom: 12px;
                background-image: url('/ams/index/figure-02-10.png');
            }
            .s2{
                width: 157px;
                height: 146px;
                right: 220px;
                bottom: 100px;
                background-image: url('/ams/index/figure-02-11.png');
            }
            .s3{
                width: 173px;
                height: 168px;
                right: 85px;
                bottom: 55px;
                background-image: url('/ams/index/figure-02-12.png');
            }
            .s4{
                left: 68px;
                top: 42px;
            }
            .s5{
                left: 210px;
                top: 113px;
            }
            p{
                top: 149px;
                left: 72px;
            }
        }
    }
}
.footer {
    background-image: url('/ams/index/footer-01.png');
    background-position: center;
    background-color: #524970;
    width: 100%;
    box-sizing: border-box;
    height: 450px;
    &-main{
        width: 1150px;
        margin: 0 auto;
        padding: 40px 0;
        position: relative;
        z-index: 1;
    }
    &-item{
        width: 200px;
        float: left;
        font-family:FZLTHJW--GB1-0,FZLTHJW--GB1;
        h4{
            color: #fff;
            font-size: 30px;
            font-weight:normal;
        }
        a{
            display: block;
            margin: 0;
            line-height: 2.5;
            font-size: 20px;
            color: #BDB8CE;
            font-weight:normal;
            &:hover{
                color: #fff;
                
            }
        }
    }
    .ewm{
        position: absolute;
        right: 0;
        top: 80px;
        width: 222px;
        z-index: 2;
        padding-top: 232px;
        background-image: url('/ams/index/footer-02.png');
        background-repeat: no-repeat;
        background-position: top center;
        text-align: center;
        color: #BDB8CE;
        line-height: 22px;
    }
}
</style>
