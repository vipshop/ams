import block from './grid';

export default {
    type: 'grid',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
