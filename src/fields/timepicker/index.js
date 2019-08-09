import view from './timepicker-view';
import edit from './timepicker-edit';

export default {
    type: 'timepicker',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
