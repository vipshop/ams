import edit from './button';

export default {
    type: 'button',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, edit);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
