export default {
  data() {
    return {
      pageId: '',
      page: {}
    }
  },
  async created() {
    this.pageId = this.$route.path === '/' ? 'home' : this.$route.path.substr(1).replace('/', '+')
    this.page = await this.$api.getPage(this.pageId)

    this.$emit('update-title', this.page.title)
  },
  methods: {
    async getListedChildren() {
      return await this.$api.getListedChildren(this.pageId)
    },
    async getFiles() {
      return await this.$api.getFiles(this.pageId)
    },
    async getKirbyText(...fields) {
      return await this.$api.getKirbyText(this.pageId, fields)
    }
  }
}
