import block from './collapse';

export default {
    type: 'collapse',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};