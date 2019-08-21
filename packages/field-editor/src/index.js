import view from './editor-view';
import edit from './editor-edit';

import VueQuillEditor from 'vue-quill-editor';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

const field = {
    type: 'editor',
    install(Vue) {
        Vue.use(VueQuillEditor);
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
