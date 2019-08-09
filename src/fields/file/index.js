import view from './file-view';
import edit from './file-edit';

export default {
    type: 'file',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
