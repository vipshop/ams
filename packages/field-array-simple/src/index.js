import view from './view';
import edit from './edit';
import ams from '@ams-team/ams';

const field = {
    type: 'array-simple',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, view);
        Vue.component(`ams-field-${this.type}-edit`, edit);
        ams.configs.baseFieldType['array-simple'] = 'array';
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
