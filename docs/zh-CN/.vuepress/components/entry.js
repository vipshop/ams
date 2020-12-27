import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import ams from '@ams-team/ams';

import VueHighlightJS from 'vue-highlight.js';
 
// Highlight.js languages (Only required languages)
// import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
// import vue from 'vue-highlight.js/lib/languages/vue';
 
/*
* Import Highlight.js theme
* Find more: https://highlightjs.org/static/demo/
*/
import 'highlight.js/styles/tomorrow-night-eighties.css';

// 定制field
// import editor from '@ams-team/field-editor';
// import markdown from '@ams-team/field-markdown';

// 定制block
// import tag from '@ams-team/field-tag';
// import calendar from '@ams-team/block-calendar';
// import card from '@ams-team/block-card';
import chart from '@ams-team/block-chart';
// import amsConfig from '../../../../packages/block-ams-config/src'
import amsConfig from '@ams-team/block-ams-config';

Vue.use(ElementUI);
Vue.use(ams);

console.log('ams init config');

// 定制field
// Vue.use(editor);
// Vue.use(markdown);

// 定制block
// Vue.use(tag);
// Vue.use(calendar);
// Vue.use(card);
Vue.use(chart);
Vue.use(amsConfig);

if(typeof window !== 'undefined'){
    window.Vue = Vue;
}

Vue.use(VueHighlightJS, {
    // Register only languages that you want
    languages: {
        javascript
    }
});

ams.config({
    resource: {
        api: {
            withCredentials: false
        }
    }
})
