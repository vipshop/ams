import view from './audio-view';
import edit from './audio-edit';

export default {
    type: 'audio',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};
