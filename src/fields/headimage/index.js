import view from './headimage-view';
import edit from './headimage-edit';

export default {
    type: 'headimage',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
