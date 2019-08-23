export const tags = {
  computed: {
    tags() {
      return this.page.tags.map(tag => tag.text).join(', ')
    }
  }
}
