import block from './timeline';

export default {
    type: 'timeline',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
