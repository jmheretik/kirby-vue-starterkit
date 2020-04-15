import Intro from '@/components/Intro.vue'
import KirbyImage from '@/components/KirbyImage.vue'

export default {
  components: {
    Intro,
    KirbyImage
  },
  data() {
    return {
      page: null,
      pageId: ''
    }
  },
  created() {
    // transform route path to pageId for use with api
    const path = this.$route.path
    this.pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1).replace('/', '+') || 'home'

    this.page = this.$api.getPage(this.pageId).then(page => (this.page = page))
  },
  async activated() {
    await this.page

    document.title = `${this.$site.title} | ${this.page.title}`
  }
}
