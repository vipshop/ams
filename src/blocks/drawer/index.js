import block from './drawer';

export default {
    type: 'drawer',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
