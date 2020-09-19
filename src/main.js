import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import './utils/permission'
import './assets/styles/transition.scss'
import moment from 'moment'
import 'animate.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import echarts from 'echarts'
import request from './utils/request'
import screenfull from 'screenfull'
import Empty from './components/empty'
import PermissionButton from './components/PermissionButton.vue'
import * as pathToRegexp from 'path-to-regexp'
import * as baseContent from './utils/base-content'
import * as tools from './utils/tools'
import * as lodash from 'lodash'
import * as filters from './utils/filters'
import './utils/directives'

Vue.use(ElementUI)

/**
 * 格式化moment
 */ 
moment.locale('zh-cn');

/**
 * 全局导入filter
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/**
 * 引入常用方法
 */
const normalFunction = {
  echarts,
  request,
  screenfull
}
Object.assign(Vue.prototype, normalFunction)

Object.keys(tools).forEach(key => {
  Vue.prototype[key] = tools[key]
})

/**
 * 引入lodash
 */
Object.keys(lodash).forEach(key => {
  Vue.prototype[key] = lodash[key]
})

/**
 * 全局注册组件
 */
Vue.component('permission-button', PermissionButton)
Vue.component('Empty', Empty)

/**
 * 引入pathToRegexp
 */
Object.keys(pathToRegexp).forEach(key => {
  Vue.prototype[key] = pathToRegexp[key]
})

/**
 * 引入常用变量
 */
Object.keys(baseContent).forEach(key => {
  Vue.prototype[key] = baseContent[key]
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')