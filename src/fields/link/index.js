import edit from '../common/text-edit';
import view from './link-view';

export default {
    type: 'link',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
