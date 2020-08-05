import Intro from '@/components/Intro.vue'
import KirbyImage from '@/components/KirbyImage.vue'

export default {
  components: {
    Intro,
    KirbyImage
  },
  data() {
    return {
      page: null
    }
  },
  created() {
    this.page = this.$api
      .getPage(this.$route.path)
      .then(page => (this.page = page))
      .catch(async () => (this.page = await this.$api.getPage('error')))
  },
  async activated() {
    await this.page

    document.title = `${this.$site.title} | ${this.page.title}`
  }
}
