<template>
  <router-link :to="'/' + album.id">
    <figure>
      <img :src="src" :alt="alt" />
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
      src: '',
      alt: ''
    }
  },
  async created() {
    const pageId = this.album.id.replace('/', '+')
    const file = await this.api.get(`pages/${pageId}/files/${this.album.content.cover[0].filename}?select=url,content`)

    this.src = file.url
    this.alt = file.content.alt
  }
}
</script>
