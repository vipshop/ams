import block from './alert';

export default {
    type: 'alert',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};