import view from './unitselect-view';
import edit from './unitselect-edit';

export default {
    type: 'unitselect',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
