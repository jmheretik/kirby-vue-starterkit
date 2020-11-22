import { createApp } from 'vue'
import { useRouter } from './router'
import { useKirby } from './composables/use-kirby'
import { useLanguage } from './composables/use-language'
import App from './App'

// self invoke async initialization
;(async () => {
  const { getLanguages, getSite } = useKirby()

  const languages = await getLanguages()
  useLanguage().init(languages)

  const site = await getSite()
  const router = await useRouter(site)
  const app = createApp(App)

  // globals
  app.config.globalProperties.$site = site

  app.use(router).mount('#app')
})()
