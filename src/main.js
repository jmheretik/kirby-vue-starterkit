import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import KirbyApi from './api/kirby'

Vue.config.productionTip = false

Vue.prototype.$api = new KirbyApi()

Vue.prototype.$api.get('site?select=title,children').then(site => {
  // filter listed pages
  site.children = site.children.filter(page => page.num)

  Router.init(site.children).then(router => {
    new Vue({
      router: router,
      render: h => h(App),

      data: {
        site: site
      }
    }).$mount('#app')
  })
})
