import block from './backtop';

export default {
    type: 'backtop',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};