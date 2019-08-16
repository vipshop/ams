import view from './block'

export default {
    type: 'template-card',
    view,
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, view)
    }
}
