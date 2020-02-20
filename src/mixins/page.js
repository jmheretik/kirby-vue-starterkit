import KirbyApi from '@/api/kirby'

export default {
  data() {
    return {
      pageId: '',
      page: {}
    }
  },
  async created() {
    this.pageId = this.$route.path === '/' ? 'home' : this.$route.path.substr(1).replace('/', '+')
    this.page = await KirbyApi.getPage(this.pageId)

    this.$emit('update-title', this.page.title)
  },
  methods: {
    async getListedChildren() {
      return await KirbyApi.getListedChildren(this.pageId)
    },
    async getFiles() {
      return await KirbyApi.getFiles(this.pageId)
    },
    async getKirbyText(...fields) {
      return await KirbyApi.getKirbyText(this.pageId, fields)
    }
  }
}
