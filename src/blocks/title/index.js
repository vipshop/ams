import block from './title';

export default {
    type: 'title',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
