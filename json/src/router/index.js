import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '@/views/Default.vue'

Vue.use(VueRouter)

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default {
  init: async site => {
    let routes = []

    // published pages routes
    for (const page of site.children) {
      routes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${capitalize(page.template)}.vue`).catch(() => Default)
      })

      for (const child of page.children) {
        routes.push({
          path: '/' + child.id,
          component: () => import(`@/views/${capitalize(child.template)}.vue`).catch(() => Default)
        })
      }
    }

    // home route / instead of /home
    routes.find(route => route.path === '/home').path = '/'
    routes.push({ path: '/home', redirect: '/' })

    // catch all fallback
    routes.push({ path: '*', component: Default })

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
