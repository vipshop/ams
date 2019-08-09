import view from './tree-view';
import edit from './tree-edit';

export default {
    type: 'tree',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
