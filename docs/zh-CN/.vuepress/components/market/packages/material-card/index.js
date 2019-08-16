import view from './block'

export default {
    type: 'material-card',
    view,
    install(Vue) {
        Vue.component(`ams-block-${this.type}`, view)
    }
}
