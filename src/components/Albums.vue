<template>
  <ul :data-even="albums.length % 2 === 0">
    <li v-for="album in albums" :key="album.id">
      <router-link :to="'/' + album.id">
        <figure>
          <KirbyImage :link="album.content.cover[0].link" :method="method" :w="w" :h="h" />

          <figcaption>{{ album.content.title }}</figcaption>
        </figure>
      </router-link>
    </li>
  </ul>
</template>

<script>
import KirbyImage from '@/components/KirbyImage.vue'

export default {
  name: 'Albums',
  components: {
    KirbyImage
  },
  props: ['method', 'w', 'h'],
  data() {
    return {
      albums: []
    }
  },
  async created() {
    const albums = await this.$api.get('pages/photography/children?select=id,num,content')
    this.albums = albums.filter(album => album.num)
  }
}
</script>
