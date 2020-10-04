import { createApp } from 'vue'
import App from './App'
import Router from './router'
import KirbyApi from './plugins/kirby-api'

const apiUrl =
  process.env.NODE_ENV === 'production' ? process.env.VUE_APP_KIRBY_URL : window.location.origin + process.env.VUE_APP_BASE_URL.slice(0, -1)

// self invoke async initialization
;(async () => {
  const api = KirbyApi.init(apiUrl)
  const site = await api.getSite()
  const router = await Router.init(site)
  const app = createApp(App)

  // globals
  app.config.globalProperties.$api = api
  app.config.globalProperties.$site = site

  app.use(router).mount('#app')
})()
