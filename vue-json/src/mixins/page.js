import Intro from '@/components/Intro.vue'

export default {
  components: {
    Intro
  },
  data() {
    return {
      page: null
    }
  },
  created() {
    // transform route path to pageId for use with api
    const path = this.$route.path
    const pageId = (path.endsWith('/') ? path.slice(0, -1) : path).slice(1) || 'home'

    this.page = this.$api.getPage(pageId).then(page => (this.page = page))
  },
  async activated() {
    await this.page

    this.$emit('update-title', this.page.title)
  }
}
