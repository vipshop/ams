import view from './rate-view';
import edit from './rate-edit';

export default {
    type: 'rate',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
