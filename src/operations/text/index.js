import operation from './text';

export default {
    type: 'text',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
