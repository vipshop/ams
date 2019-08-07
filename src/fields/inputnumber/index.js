import view from '../common/view';
import edit from './inputnumber-edit';

export default {
    type: 'inputnumber',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
