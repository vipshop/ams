import block from './error';

export default {
    type: 'error',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
