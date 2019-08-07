import view from '../common/options-view';
import edit from './select-edit';

export default {
    type: 'select',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
