import block from './tabs';

export default {
    type: 'tabs',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
