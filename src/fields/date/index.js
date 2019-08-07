import view from './date-view';
import edit from './date-edit';

export default {
    type: 'date',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
