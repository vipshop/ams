import block from './carousel';

export default {
    type: 'carousel',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
