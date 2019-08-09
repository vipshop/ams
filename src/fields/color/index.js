import view from './color-view';
import edit from './color-edit';

export default {
    type: 'color',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
