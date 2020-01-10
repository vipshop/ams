/* eslint-disable no-new */
import Vue from 'vue';

import ams from '@ams-team/ams';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// vipshop定制主题
import '@ams-team/ams/lib/theme-vipshop/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import '@/styles/index.scss'; // global css

import editor from '@ams-team/field-editor';
import markdown from '@ams-team/field-markdown';
import chart from '@ams-team/block-chart';

import App from './App';

window.ElementUI = ElementUI;
Vue.use(ElementUI, { locale });
Vue.use(ams);
Vue.use(editor);
Vue.use(markdown);
Vue.use(chart);

Vue.config.productionTip = false;

// import ams configs
import './ams-config';

new Vue({
    el: '#app',
    render: h => h(App)
});
