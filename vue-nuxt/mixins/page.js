import Intro from '@/components/Intro.vue'

export default {
  middleware({ app, route: { name, path }, redirect }) {
    // transform route path to pageId for use with api
    app.$pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

    // redirect /home to /
    if (app.$pageId === 'home' && name !== 'index') return redirect('/')
  },
  validate({ app }) {
    return app.$site.routes.some(route => route === app.$pageId)
  },
  components: {
    Intro
  },
  async asyncData({ app }) {
    return {
      page: await app.$api.getPage(app.$pageId)
    }
  },
  head() {
    return {
      title: `${this.$site.title} | ${this.page.title}`
    }
  }
}
