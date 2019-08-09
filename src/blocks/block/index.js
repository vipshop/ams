import block from './block';
import blocks from './blocks';
import operations from './operations';

export default {
    install(Vue) {
        Vue.component('ams-block', block);
        Vue.component('ams-blocks', blocks);
        Vue.component('ams-operations', operations);
    }
};
