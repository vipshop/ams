import operation from './button';

export default {
    type: 'reset',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
