import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Api from './api'
import moment from 'moment'

Vue.config.productionTip = false

// globals
Vue.prototype.$api = new Api()

Vue.filter('moment', (date, format) => {
  return date ? moment(date).format(format) : ''
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
