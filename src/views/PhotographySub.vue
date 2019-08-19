<template>
  <main class="album">
    <article>
      <header>
        <figure class="album-cover">
          <img :src="cover.url" :alt="cover.content.alt" />
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
              <img :src="image.url" :alt="image.content.alt" />
            </a>
          </figure>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
export default {
  name: 'PhotographySub',
  props: ['api'],
  data() {
    return {
      page: {},
      cover: {
        content: {}
      },
      gallery: []
    }
  },
  computed: {
    tags() {
      return this.page.tags.map(e => e.text).join(', ')
    }
  },
  async created() {
    const pageId = `photography+${this.$route.params.id}`
    const page = await this.api.get(`pages/${pageId}?select=content`)
    const kt = await this.api.get(`kt/${pageId}?select=description`)
    page.content.description = kt.description.value

    this.page = page.content
    this.$emit('change-title', this.page.title)

    const cover = await this.api.get(`pages/${pageId}/files/${page.content.cover[0].filename}?select=url,content`)
    this.cover = cover

    const gallery = await this.api.get(`pages/${pageId}/files?select=url,type,content`)
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
