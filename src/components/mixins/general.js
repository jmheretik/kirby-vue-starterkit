export const tags = {
  computed: {
    tags() {
      return this.page.tags.map(e => e.text).join(', ')
    }
  }
}
