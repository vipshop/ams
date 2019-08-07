import view from './datetime-view';
import edit from './datetime-edit';

export default {
    type: 'datetime',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
