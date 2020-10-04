import Intro from '../components/Intro'

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
