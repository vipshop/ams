import block from './component';

export default {
    type: 'component',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
