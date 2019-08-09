import view from '../common/text-view';
import edit from './textarea-edit';

export default {
    type: 'textarea',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
