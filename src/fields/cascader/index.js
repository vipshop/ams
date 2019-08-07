import view from './cascader-view';
import edit from './cascader-edit';

export default {
    type: 'cascader',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
