import operation from './field';

export default {
    type: 'field',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
