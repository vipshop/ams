import view from './switch-view';
import edit from './switch-edit';

export default {
    type: 'switch',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
