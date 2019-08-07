import view from './time-view';
import edit from './time-edit';

export default {
    type: 'time',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
