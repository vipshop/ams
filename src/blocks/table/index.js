import block from './table';

export default {
    type: 'table',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
