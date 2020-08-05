<template>
  <img :src="image.src" :alt="image.alt" />
</template>

<script>
export default {
  name: 'KirbyImage',
  props: ['file', 'thumb', 'params'],
  data() {
    return {
      image: {}
    }
  },
  async created() {
    const image = {}

    if (this.file.content) {
      image.alt = this.file.content.alt
    } else {
      const content = await this.$api.getFile(this.file.link.slice(1))
      image.alt = content.alt
    }

    if (!this.thumb) {
      image.src = this.file.url
    } else {
      image.src = await this.$api.getFileThumb(this.file.link.slice(1), this.thumb, this.params)
    }

    this.image = image
  }
}
</script>
