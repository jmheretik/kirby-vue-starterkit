import Intro from '@/components/Intro.vue'
import KirbyImage from '@/components/KirbyImage.vue'

export default {
  components: {
    Intro,
    KirbyImage
  },
  data() {
    return {
      page: {},
      pageId: '',
      pageLoaded: null
    }
  },
  created() {
    // transform current vue-router path to use with Kirby API
    this.pageId = this.$route.path.substr(1).replace('/', '+') || 'home'

    // wait for page to be fetched from API and rendered
    this.pageLoaded = new Promise(async resolve => {
      try {
        this.page = await this.$api.getPage(this.pageId)
      } catch {
        this.page = await this.$api.getPage('error')
        this.page.text = null

        const kt = await this.$api.getKirbyText('error', 'text')
        this.page.text = kt.text
      }

      await this.$nextTick()

      resolve()
    })
  },
  async activated() {
    await this.pageLoaded

    this.$emit('update-title', this.page.title)
  }
}
