import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import KirbyApi from '@/plugins/kirby-api'

Vue.config.productionTip = false

// self invoke async initialization
;(async () => {
  const api = KirbyApi.init(process.env.VUE_APP_API_URL || (window.location.origin + process.env.BASE_URL).slice(0, -1))
  const site = (await api.getPage('home')).site
  const router = await Router.init(site)

  // globals
  Vue.prototype.$api = api
  Vue.prototype.$site = site

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})()
