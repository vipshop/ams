import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/selection/active-line.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/lint/javascript-lint.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

import ams from '@ams-team/ams';

import code from './code';

const field = {
    type: 'ams-code',
    install(Vue) {
        ams.configs.defaultFieldConfig['ams-code'] = {
            // 默认为string，非string会转换成js表达式的值
            // string | object | function
            valueType: 'string'
        };
        Vue.component(`ams-field-${this.type}-view`, code);
        Vue.component(`ams-field-${this.type}-edit`, code);
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        field.install(window.Vue);
    }
}

export default field;
