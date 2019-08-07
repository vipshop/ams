import block from './dropdown';

export default {
    type: 'dropdown',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
