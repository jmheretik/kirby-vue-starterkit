<template>
  <router-link :to="'/' + album.id">
    <figure>
      <img :src="cover.url" :alt="cover.content.alt" />
      <figcaption>
        {{ album.content.title }}
      </figcaption>
    </figure>
  </router-link>
</template>

<script>
export default {
  name: 'Cover',
  props: ['api', 'album'],
  data() {
    return {
      cover: {
        content: {}
      }
    }
  },
  async created() {
    const pageId = this.album.id.replace('/', '+')
    const cover = await this.api.get(`pages/${pageId}/files/${this.album.content.cover[0].filename}?select=url,content`)

    this.cover = cover
  }
}
</script>
