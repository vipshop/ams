import operation from './button';

export default {
    type: 'button',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
