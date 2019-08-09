import view from './transfer-view';
import edit from './transfer-edit';

export default {
    type: 'transfer',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
