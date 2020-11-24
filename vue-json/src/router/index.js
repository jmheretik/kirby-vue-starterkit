import { createRouter, createWebHistory } from 'vue-router'
import { useLanguage } from '../composables/use-language'
import Default from '../views/Default.vue'

export const useRouter = site => {
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

  // published pages routes
  const routes = [
    ...site.children.map(page => ({
      path: '/' + page.uri,
      component: () => import(`../views/${capitalize(page.template)}.vue`).catch(() => Default)
    })),
    ...site.children
      .filter(page => page.childTemplate)
      .map(page => ({
        path: '/' + page.uri + '/:id',
        component: () => import(`../views/${capitalize(page.childTemplate)}.vue`).catch(() => Default)
      }))
  ]

  // home route / instead of /home
  routes.find(route => route.path === '/home').path = '/'
  routes.push({ path: '/home', redirect: '/' })

  // catch all fallback
  routes.push({ path: '/:pathMatch(.*)*', component: Default })

  return createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL + useLanguage().prefix),
    routes
  })
}
