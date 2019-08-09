import block from './form';

export default {
    type: 'form',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
