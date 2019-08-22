<template>
  <ul :data-even="albums.length % 2 === 0">
    <li v-for="album in albums" :key="album.id">
      <router-link :to="'/' + album.id">
        <Cover :link="album.content.cover[0].link">
          {{ album.content.title }}
        </Cover>
      </router-link>
    </li>
  </ul>
</template>

<script>
import Cover from '@/components/Cover.vue'

export default {
  name: 'Albums',
  components: {
    Cover
  },
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
