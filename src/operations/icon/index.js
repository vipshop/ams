import operation from './icon';

export default {
    type: 'icon',
    install(Vue) {
        Vue.component(`ams-operation-${this.type}`, operation);
    }
};
