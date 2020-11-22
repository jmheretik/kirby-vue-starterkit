import Vue from 'vue'
import Router from 'vue-router'
import { useKirby } from '../composables/use-kirby'
import { useLanguage } from '../composables/use-language'

Vue.use(Router)

export async function createRouter(ssrContext, createDefaultRouter, routerOptions) {
  const options = routerOptions || createDefaultRouter(ssrContext).options
  options.routes.splice(options.routes.length - 1, 0, { path: '/home', redirect: '/' })

  if (!process.env.isStatic) {
    const languages = await useKirby().getLanguages()
    useLanguage().init(languages)
  }

  return new Router({
    ...options,
    base: options.base + useLanguage().prefix,
  })
}
