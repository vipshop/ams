import view from '../common/text-view';
import edit from '../common/text-edit';

export default {
    type: 'text',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
