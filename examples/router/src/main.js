/* eslint-disable no-new */
import Vue from 'vue';

import ams from '@ams-team/ams';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import '@ams-team/ams/lib/theme-vipshop/index.css';
import '../../../packages/theme-vipshop/src/index.scss';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n

import '@/styles/index.scss'; // global css

// import calendar from '@ams-team/block-calendar';
// import dragimage from '@ams-team/block-drag-image';
import editor from '@ams-team/field-editor';
import markdown from '@ams-team/field-markdown';
import arraylist from '@ams-team/field-arraylist';
import chart from '@ams-team/block-chart';
// import xlsx from '@ams-team/block-xlsx';
// import navUser from '@ams-team/block-nav-user';

import App from './App';

window.ElementUI = ElementUI;
Vue.use(ElementUI, { locale });
Vue.use(ams);
// Vue.use(calendar);
Vue.use(editor);
Vue.use(markdown);
Vue.use(arraylist);
Vue.use(chart);
// Vue.use(xlsx);
// Vue.use(navUser);

Vue.config.productionTip = false;

// import ams configs
import './ams-config';

new Vue({
    el: '#app',
    render: h => h(App)
});
