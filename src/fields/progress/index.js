import view from './progress-view';
import edit from './progress-edit';

export default {
    type: 'progress',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
