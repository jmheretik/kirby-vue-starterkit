<template>
  <img :src="image.src" :alt="image.alt" />
</template>

<script>
export default {
  name: 'KirbyImage',
  props: ['link', 'method', 'w', 'h'],
  data() {
    return {
      image: {}
    }
  },
  async created() {
    let image = {}

    // /pages/:id/files/:id -> pages/:id/files/:id
    const file = await this.$api.get(`${this.link.substr(1)}?select=url,content`)
    image.alt = file.content.alt

    if (!this.method || this.method === '') {
      image.src = file.url
    } else {
      // /pages/:id/files/:id -> (resize|crop)/:id/file/:id
      const url = this.link
        .substr(1)
        .replace('pages', this.method)
        .replace('files', 'file')

      const processedFile = await this.$api.get(`${url}?w=${this.w}&h=${this.h}`)
      image.src = processedFile
    }

    this.image = image
  }
}
</script>
