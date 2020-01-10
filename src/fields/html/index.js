import html from './html';

export default {
    type: 'html',
    install(Vue) {
        Vue.component(`ams-field-${this.type}-view`, html);
        Vue.component(`ams-field-${this.type}-edit`, html);
    }
};
