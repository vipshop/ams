import Vue from 'vue'

import ams from '@ams-team/ams'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// vipshop定制主题
import '@ams-team/ams/lib/theme-vipshop/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App'

Vue.use(ElementUI, { locale })
Vue.use(ams)

Vue.config.productionTip = false

ams.block('demo', {
    type: 'form',
    ctx: 'view',
    data: {
        logo: '//h5rsc.vipstatic.com/ams/ams-logo2.png',
		testText: '你好，欢迎来到AMS世界！',
		github: 'https://github.com/vipshop/ams',
		docs: 'https://vipshop.github.io/ams/'
	},
	style: {
		marginTop: '30px'
	},
    resource: {
		fields: {
			logo: {
				type: 'image',
				label: ''
			},
			testText: {
				type: 'text'
			},
			github: {
				type: 'text',
				label: '仓库'
			},
			docs: {
				type: 'text',
				label: '文档'
			}
		}
	}
})

new Vue({
    el: '#app',
    render: h => h(App)
})
