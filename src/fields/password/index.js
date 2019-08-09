import view from './password-view';
import edit from './password-edit';

export default {
    type: 'password',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
