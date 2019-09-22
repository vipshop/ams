import block from './popover';

export default {
    type: 'popover',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, block);
    }
};
