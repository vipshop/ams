import view from './video-view';
import edit from './video-edit';

export default {
    type: 'video',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
