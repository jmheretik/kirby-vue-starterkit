<template>
  <figure>
    <img :src="cover.url" :alt="cover.content.alt" />

    <figcaption>
      <slot></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Cover',
  props: ['link'],
  data() {
    return {
      cover: {
        content: {}
      }
    }
  },
  async created() {
    const cover = await this.$api.get(`${this.link.substr(1)}?select=url,content`)
    this.cover = cover
  }
}
</script>
