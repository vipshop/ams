import block from './card';

export default {
    type: 'card',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
