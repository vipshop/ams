import view from './image-view';
import edit from './image-edit';

export default {
    type: 'image',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
