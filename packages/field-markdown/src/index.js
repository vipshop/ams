import view from './markdown-view';
import edit from './markdown-edit';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

const field = {
    type: 'markdown',
    install(Vue) {
        Vue.use(mavonEditor);
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
