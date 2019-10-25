import Vue from 'vue'

import ams from '@ams-team/ams'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App'
import chart from '@ams-team/block-chart';

import './ams-config';

Vue.use(ElementUI, { locale })
Vue.use(ams)
Vue.use(chart);

Vue.config.productionTip = false

new Vue({
    el: '#app',
    render: h => h(App)
})
