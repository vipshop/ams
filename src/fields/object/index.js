// import view from './object-view';
import edit from './object-edit';

export default {
    type: 'object',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, edit);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
