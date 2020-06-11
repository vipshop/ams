import Vue from 'vue';
import VueRouter from 'vue-router';

// compoents
import App from './App.vue';
import List from './List.vue';
import Detail from './detail.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n
import ams from '@ams-team/ams';
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;
Vue.use(ams);

const div = document.createElement('div');
div.id = 'app';
document.body.appendChild(div);

const routes = [
    { path: '/', component: List },
    { path: '/detail', component: Detail }
];


const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
});

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
