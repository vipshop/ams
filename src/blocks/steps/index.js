import block from './steps';

export default {
    type: 'steps',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
