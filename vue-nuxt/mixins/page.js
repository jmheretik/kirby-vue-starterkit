import Intro from '@/components/Intro.vue'

export default {
  middleware({ app, route: { name, path }, redirect }) {
    // transform route path to pageId for use with api
    app.$pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

    // redirect /home to /
    if (app.$pageId === 'home' && name !== 'index') return redirect('/')
  },
  components: {
    Intro
  },
  asyncData({ app, error }) {
    return app.$api
      .getPage(app.$pageId)
      .then(page => ({ page }))
      .catch(async () => error({ page: await app.$api.getPage('error') }))
  },
  head() {
    return {
      title: `${this.$site.title} | ${this.page.title}`
    }
  }
}
