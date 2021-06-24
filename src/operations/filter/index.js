import operation from './filter';

export default {
    type: 'filter',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
