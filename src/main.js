import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Api from './api'

Vue.config.productionTip = false

const api = new Api()

api.get('site?select=title').then(site => {
  // globals
  Vue.prototype.$api = api
  Vue.prototype.$site = site.title

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})
