import operation from './dropdown';

export default {
    type: 'dropdown',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
