<template>
  <img :src="image.src" :alt="image.alt" />
</template>

<script>
export default {
  name: 'KirbyImage',
  props: ['file', 'method', 'w', 'h'],
  data() {
    return {
      image: {}
    }
  },
  async created() {
    let image = {}

    if (this.file.content) {
      image.alt = this.file.content.alt
    } else {
      const content = await this.$api.getFileContent(this.file.link)
      image.alt = content.alt
    }

    if (!this.method) {
      image.src = this.file.url
    } else {
      image.src = await this.$api.getFileProcessed(this.file.link, this.method, this.w, this.h)
    }

    this.image = image
  }
}
</script>
