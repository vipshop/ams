import view from './datetimerange-view';
import edit from './datetimerange-edit';

export default {
    type: 'datetimerange',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
