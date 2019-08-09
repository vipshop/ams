import view from './slider-view';
import edit from './slider-edit';

export default {
    type: 'slider',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
