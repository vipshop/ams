import block from './imagelist';

export default {
    type: 'imagelist',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
