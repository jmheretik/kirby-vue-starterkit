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
    this.pageId = this.$route.path.substr(1).replace('/', '+') || 'home'

    this.pageLoaded = new Promise(async resolve => {
      this.page = await this.$api.getPage(this.pageId)

      await this.$nextTick()

      resolve()
    })
  },
  async activated() {
    await this.pageLoaded

    this.$emit('update-title', this.page.title)
  }
}
