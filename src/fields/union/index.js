import view from './union-view';
import edit from './union-edit';

export default {
    type: 'union',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
