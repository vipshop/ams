import view from './array-view';
import edit from './array-edit';

export default {
    type: 'array',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
