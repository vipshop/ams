import view from './timerange-view';
import edit from './timerange-edit';

export default {
    type: 'timerange',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
