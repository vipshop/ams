import view from './view';
import edit from './edit';

const field = {
    type: 'radio-img',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
        ams.configs.baseFieldType['radio-img'] = 'radio';
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
