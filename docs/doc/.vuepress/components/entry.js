import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import ams from '@ams-team/ams';
// 定制field

// 定制block
import chart from '@ams/block-chart';
import amsConfig from '@ams/block-ams-config';

Vue.use(ElementUI);
Vue.use(ams);

console.log('ams init config');

// 定制field

// 定制block
Vue.use(chart);
Vue.use(amsConfig);

if(typeof window !== 'undefined'){
    window.Vue = Vue;
}

ams.config({
    resource: {
        api: {
            withCredentials: false
        }
    }
})
