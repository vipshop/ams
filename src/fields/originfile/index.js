import view from './originfile-view';
import edit from './originfile-edit';

const field = {
    type: 'originfile',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
    }
};

if (typeof window !== 'undefined') {
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
