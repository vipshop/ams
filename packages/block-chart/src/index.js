import ele from './block';

const block = {
    type: 'chart',
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, ele);
    }
};

if (typeof window !== 'undefined') {
    // export to global
    if (window.Vue) {
        block.install(window.Vue);
    }
}

export default block;
