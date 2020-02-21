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
      pageId: ''
    }
  },
  async created() {
    this.pageId = this.$route.path === '/' ? 'home' : this.$route.path.substr(1).replace('/', '+')
    this.page = await this.$api.getPage(this.pageId)

    this.$emit('update-title', this.page.title)
  }
}
