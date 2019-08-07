/* eslint-disable no-new */
import Vue from 'vue';

import ams from '@ams-team/ams';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import '@/styles/index.scss'; // global css

import calendar from '@ams/block-calendar';
import editor from '@ams/field-editor';
import markdown from '@ams/field-markdown';
import arraylist from '@ams/field-arraylist';
import chart from '@ams/block-chart';
import xlsx from '@ams/block-xlsx';

import App from './App';

window.ElementUI = ElementUI;
Vue.use(ElementUI, { locale });
Vue.use(ams);
Vue.use(calendar);
Vue.use(editor);
Vue.use(markdown);
Vue.use(arraylist);
Vue.use(chart);
Vue.use(xlsx);

Vue.config.productionTip = false;

// import ams configs
import './ams-config';

new Vue({
    el: '#app',
    render: h => h(App)
});
