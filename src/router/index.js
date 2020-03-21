import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Default from '@/views/Default.vue'
import KirbyApi from '@/api/kirby'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'Default',
    component: Default
  }
]

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default {
  async init(site) {
    // filter out unlisted pages
    site.children = site.children.filter(page => page.num)

    // setup routes
    for (const page of site.children) {
      const pageInfo = await KirbyApi.get(`pages/${page.id}?select=template,hasChildren`)

      routes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${capitalize(pageInfo.template)}.vue`)
      })

      if (pageInfo.hasChildren) {
        const childPageInfo = await KirbyApi.get(`pages/${page.id}/children?select=template&limit=1	`)

        routes.push({
          path: '/' + page.id + '/:id',
          component: () => import(`@/views/${capitalize(childPageInfo[0].template)}.vue`)
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
