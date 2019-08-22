<template>
  <main class="album">
    <article>
      <header>
        <figure v-if="page.cover" class="album-cover">
          <KirbyImage :link="page.cover[0].link" method="crop" w="1024" h="768" />

          <figcaption>
            <h1>{{ page.headline || page.title }}</h1>
          </figcaption>
        </figure>
      </header>

      <div class="album-text text">
        <span v-html="page.description"></span>
        <p v-if="page.tags" class="album-tags tags">{{ tags }}</p>
      </div>

      <ul class="album-gallery" :data-even="gallery.length % 2 === 0">
        <li v-for="image in gallery" :key="image.id">
          <figure>
            <a :href="image.content.link || image.url">
              <KirbyImage :link="image.link" method="crop" w="800" h="1000" />
            </a>
          </figure>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import KirbyImage from '@/components/KirbyImage.vue'
import { tags } from '@/components/mixins/general'

export default {
  name: 'PhotographySub',
  components: {
    KirbyImage
  },
  mixins: [tags],
  data() {
    return {
      page: {},
      gallery: []
    }
  },
  async created() {
    const pageId = `photography+${this.$route.params.id}`
    const page = await this.$api.get(`pages/${pageId}?select=content`)
    const kt = await this.$api.get(`kt/${pageId}?select=description`)
    page.content.description = kt.description.value

    this.page = page.content
    this.$emit('change-title', this.page.title)

    const gallery = await this.$api.get(`pages/${pageId}/files?select=url,type,link,content`)
    this.gallery = gallery.filter(file => file.type === 'image')
  }
}
</script>

<style>
.album-cover {
  position: relative;
  line-height: 0;
  margin-bottom: 6rem;
  background: #000;
  padding-bottom: 75%;
}
.album-cover figcaption {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: #fff;
  line-height: 1;
  padding: 1.5rem;
}
.album-cover img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.album-cover h1 {
  font-size: 3rem;
}
.album-text {
  max-width: 40rem;
  margin: 0 auto 6rem;
  text-align: center;
}
.album-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin: 0 auto;
  grid-gap: 1rem;
  max-width: calc(var(--content-width) - 15rem);
  justify-content: center;
}
.album-gallery[data-even] {
  grid-template-columns: repeat(4, 1fr);
}
.album-gallery[data-count='1'] {
  grid-template-columns: 1fr;
}
.album-gallery[data-count='2'] {
  grid-template-columns: 1fr 1fr;
}
</style>
