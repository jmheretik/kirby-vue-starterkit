import { createRouter, createWebHistory } from 'vue-router'
import { useLanguage } from '../composables/use-language'
import Default from '../views/Default'

export const useRouter = async site => {
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

  // published pages routes
  const routes = site.children.flatMap(page => [
    {
      path: '/' + page.uri,
      component: () => import(`../views/${capitalize(page.template)}`).catch(() => Default)
    },
    ...page.children.map(child => ({
      path: '/' + child.uri,
      component: () => import(`../views/${capitalize(child.template)}`).catch(() => Default)
    }))
  ])

  // home route / instead of /home
  routes.find(route => route.path === '/home').path = '/'
  routes.push({ path: '/home', redirect: '/' })

  // catch all fallback
  routes.push({ path: '/:pathMatch(.*)*', component: Default })

  return createRouter({
    history: createWebHistory(process.env.VUE_APP_BASE_URL + useLanguage().prefix),
    routes
  })
}
