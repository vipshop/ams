import edit from './radio-edit';
import view from '../common/options-view';

export default {
    type: 'radio',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
