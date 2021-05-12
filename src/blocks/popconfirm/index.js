import block from './popconfirm';

export default {
    type: 'popconfirm',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
