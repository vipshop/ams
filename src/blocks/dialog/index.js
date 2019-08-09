import block from './dialog';

export default {
    type: 'dialog',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
