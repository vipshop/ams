import view from '../common/options-view';
import edit from './checkbox-edit';

export default {
    type: 'checkbox',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
