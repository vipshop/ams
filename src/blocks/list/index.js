import block from './list';

export default {
    type: 'list',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
