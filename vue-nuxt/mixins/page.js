import Intro from '@/components/Intro.vue'

export default {
  middleware({ route, redirect }) {
    if (route.path === '/home' || route.path === '/home/') return redirect('/')
  },
  components: {
    Intro
  },
  asyncData({ app, route, error }) {
    return app.$api
      .getPage(route.path)
      .then(page => ({ page }))
      .catch(async () => error({ page: await app.$api.getPage('error') }))
  },
  head() {
    return {
      title: `${this.$site.title} | ${this.page.title}`
    }
  }
}
