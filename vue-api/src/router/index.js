import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '@/views/Default.vue'

Vue.use(VueRouter)

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default {
  init: async site => {
    // published pages routes
    const routes = site.children.flatMap(page => [
      {
        path: '/' + page.id,
        component: () => import(`@/views/${capitalize(page.template)}.vue`).catch(() => Default)
      },
      ...page.children.map(child => ({
        path: '/' + child.id,
        component: () => import(`@/views/${capitalize(child.template)}.vue`).catch(() => Default)
      }))
    ])

    // home route / instead of /home
    routes.find(route => route.path === '/home').path = '/'
    routes.push({ path: '/home', redirect: '/' })

    // catch all fallback
    routes.push({ path: '*', component: Default })

    return new VueRouter({
      mode: 'history',
      base: process.env.VUE_APP_BASE_URL,
      routes
    })
  }
}
