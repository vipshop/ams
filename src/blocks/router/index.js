import block from './router';
import VueRouter from 'vue-router';
import Router from './components/Router.vue';

export default {
    type: 'router',
    install(Vue) {
        if (typeof window !== 'undefined') {
            // umd 模式下 VueRouter to global
            if (window.Vue) {
                window.VueRouter = VueRouter;
            }
        }

        // 不用全局componet无法动态修改$options，而vue-router依赖于options!!!;
        Vue.component('ams-router', Router);

        // 避免重复use VueRouter，会报错（如果本身项目有VueRouter）
        if (!Vue.component('RouterView') && !Vue.component('router-view')) {
            Vue.use(VueRouter);
        }
        Vue.component(`ams-block-${this.type}`, block);
    }
};
