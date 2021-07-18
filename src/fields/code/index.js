import code from './code';

export default {
    type: 'code',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, code);
        Vue.component(`ams-field-${this.type}-edit`, code);
    }
};
