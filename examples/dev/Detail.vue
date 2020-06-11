<template>
    <div class="maretial-detail">
        <el-breadcrumb class="ams-dev-breadcrumb"
                       separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>
                <router-link to="/">物料列表</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                {{$route.query.name}}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="list">
            <div class="maretial-title">常用功能</div>
            <div class="maretial-btns">
                <el-button type="primary"
                           @click="previewCDN">cdn链接预览</el-button>
            </div>
            <div class="maretial-title">示例列表</div>
            <ams-block name="examples"
                       v-if="ready"></ams-block>
            <template v-if="previewReady">
                <div class="maretial-title">可视化配置</div>
                <ams-block name="amsConfigPreivew"></ams-block>
            </template>
            <ams-block name="previewCDN"
                       v-if="previewCDNReady"></ams-block>
            <ams-block name="configForm" v-if="previewCDNReady"></ams-block>
        </div>
    </div>
</template>

<script>
import ams from '@ams-team/ams';
import Vue from 'vue';
let configContext = require.context('../../packages', true, /^\.\/(?:block|field)-[\w-]+\/__config__\/[\w\.]+\.js$/);
let pkgContext = require.context('../../packages', true, /^\.\/(?:block|field)-[\w-]+\/package.json$/);
// block-xlsx 有script-loader、worker-loader、typescript等依赖，暂时先跳过特殊处理
let detailContext = require.context('../../packages', true, /^\.\/(?:block|field)-(?!xlsx)[\w-]+\/src\/index.js$/);

import amsConfig from '../../packages/block-ams-config/src/index';
Vue.use(amsConfig);

export default {
    data() {
        return {
            name: '',
            type: '',
            ready: false,
            previewReady: false,
            previewCDNReady: false,
            examples: null,
            pkg: null,
            config: null,
            // config: null
        };
    },
    async created() {
        this.name = this.$route.query.name;
        this.type = this.$route.query.type;
        const pkg = pkgContext(`./${this.type}-${this.name}/package.json`);
        const detail = detailContext(`./${this.type}-${this.name}/src/index.js`).default;
        // 引入定制模块
        Vue.use(detail);
        // 示例block
        let examplesBlock = { type: 'tabs', options: {}, data: {}, blocks: {}};
        let config;
        let reg = new RegExp(`\\\/${this.type}-${this.name}\\\/`);
        // 解析示例配置
        configContext.keys().forEach(key => {
            // console.log('key', key);
            // 获取当前模块下的配置
            if (reg.test(key)) {
                let module = configContext(key);
                // 示例
                if (/\.example\.js$/.test(key)) {
                    let keyName = key.replace(/\.example\.js$/, '').replace(/^\.\/[^\/]+\/__config__\//, '');
                    // console.log('keyName', keyName);
                    // this.examples[keyName] = module;
                    examplesBlock.blocks[keyName] = module.default;
                    examplesBlock.options[keyName] = {
                        label: keyName,
                        lazy: true
                    };
                    // ams.block(keyName, module);
                } else if (/\.config\.js$/.test(key)) {
                    config = module;
                    this.config = config;
                    if (module.config) {
                        window.AMS_CONFIG[this.type][this.name] = {
                            config: module.config,
                            defaults: module.defaults,
                        };
                        // console.log(this.type, this.name);
                        // ams.block('config', module);
                        ams.block('amsConfigPreivew', {
                            type: 'ams-config',
                            options: {
                                type: this.type,
                                name: this.name
                            }
                        });
                        this.previewReady = true;
                    } else {
                        console.warn('no ams config');
                    }
                    // cdn链接预览
                    ams.block('previewCDN', {
                        type: 'dialog',
                        props: {
                            fullscreen: true
                        },
                        data: {
                            visible: false
                        },
                        operations: {
                            hide: {
                                type: 'button',
                                label: '关闭'
                            }
                        },
                        blocks: {
                            previewCDNIframe: {
                                type: 'component',
                                options: {
                                    is: 'iframe'
                                },
                                props: {
                                    id: 'previewCDNIframe'
                                },
                                style: {
                                    height: `${window.innerHeight - 170}px`
                                }
                            }
                        }
                    });
                    ams.block('configForm', {
                        type: 'form',
                        resource: {
                            fields: this.config.config
                        },
                        style: {
                            display: 'none'
                        }
                    });
                    this.previewCDNReady = true;
                }
            }
        });

        // console.log('detail', detail);
        // console.log('config', config);
        // console.log('pkg', pkg);
        // console.log('examples', examplesBlock);
        this.pkg = pkg;
        ams.block('examples', examplesBlock);
        this.ready = true;
    },
    methods: {
        previewCDN() {
            ams.callAction('@previewCDN.show');
            setTimeout(() => {
                let iframe = document.querySelector('#previewCDNIframe');
                if (iframe && this.config && this.pkg) {
                    let cdnLinks = this.pkg.amsConfig && this.pkg.amsConfig.cdn && this.pkg.amsConfig.cdn.map(url => {
                        return `<script src="${url}"><\/script>`;
                    }).join('\n') || '';
                    let code = `
<!--加载框架-->
<link rel="stylesheet" href="https://h5rsc.vipstatic.com/ams/element-ui@2.11.1/theme-chalk/index.css"/>
<script src="https://h5rsc.vipstatic.com/ams/vue@2.6.10.js"><\/script>
<script src="https://h5rsc.vipstatic.com/ams/element-ui@2.11.1/index.js"><\/script>
<script src="https://h5rsc.vipstatic.com/ams/ams@0.18.0.js"><\/script>
<!--物料依赖-->
${cdnLinks}
<!--加载物料-->
<script src="https://h5rsc.vipstatic.com/ams/${this.type === 'field' ? 'fields' : 'block'}/${this.type}-${this.name}@${this.pkg.version}.js"><\/script>
                    `;
                    let script = this.type === 'field' ? `
                    ams.block('demo', {
                        type: 'form',
                        ctx: 'edit',
                        style: {
                            width: '500px',
                            height: '500px'
                        },
                        resource: {
                            fields: {
                                testField: ${JSON.stringify(ams.$blocks.configForm.data)}
                            }
                        },
                        data: {
                            testField: undefined
                        },
                        render: '#app'
                    })` : `
                    ams.block('demo', ${JSON.stringify({ ...ams.$blocks.configForm.data, render: '#app' })})
                    `;
                    iframe.srcdoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>cdn链接预览</title>
    ${code}
</head>
<body>
<div>加载脚本：</div>
<textarea style="height:220px; width: 100%; margin:0; padding: 0; box-sizing: border-box">
${code}
</textarea>
<div>效果预览：</div>
<div id="app"></div>
<script>${script}<\/script>
</body>
</html>`;
                }
            }, 0);
        }
    }
};
</script>

<style lang="scss">
.maretial-detail {
    .maretial-title {
        margin: 20px 0;
        font-size: 26px;
        line-height: 2.4em;
        padding: 0 10px;
        font-weight: bold;
        background-color: #f9f9f9;
        // color: #2c3e50;
        color: #465e69;
    }
    #previewCDNIframe {
        border: 1px solid #e4e4e4;
        border-radius: 4px;
    }
}
</style>
