import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import KirbyApi from '@/api/kirby'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default {
  async init(pages) {
    for (const page of pages) {
      const pageInfo = await KirbyApi.get(`pages/${page.id}?select=template,hasChildren`)

      routes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${capitalize(pageInfo.template)}.vue`)
      })

      if (pageInfo.hasChildren) {
        const childPage = await KirbyApi.get(`pages/${page.id}/children?select=template&limit=1	`)

        routes.push({
          path: '/' + page.id + '/:id',
          component: () => import(`@/views/${capitalize(childPage[0].template)}.vue`)
        })
      }
    }

    return new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes
    })
  }
}
