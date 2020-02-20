import Vue from 'vue'
import App from '@/App.vue'
import Router from '@/router'
import KirbyApi from '@/api/kirby'

Vue.config.productionTip = false

// eslint-disable-next-line prettier/prettier
;(async () => {
  const site = await KirbyApi.get('site?select=title,children')

  // filter listed pages
  site.children = site.children.filter(page => page.num)

  const router = await Router.init(site.children)

  new Vue({
    router,
    render: h => h(App),

    data: {
      site: site
    }
  }).$mount('#app')
})()
