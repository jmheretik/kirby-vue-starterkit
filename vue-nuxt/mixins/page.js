import { useKirby } from '../composables/use-kirby'

export default {
  middleware({ route, redirect }) {
    if (route.path === '/home' || route.path === '/home/') return redirect('/')
  },
  async asyncData({ route, error }) {
    const { getPage } = useKirby()

    try {
      return { page: await getPage(route.path) }
    } catch {
      return error({ page: await getPage('error') })
    }
  },
  head() {
    return {
      title: `${this.$site.title} | ${this.page.title}`,
    }
  },
}
