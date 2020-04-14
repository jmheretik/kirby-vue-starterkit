<template>
  <main class="album">
    <article>
      <header>
        <figure v-if="page.cover[0]" class="album-cover">
          <KirbyImage :file="page.cover[0]" thumb="crop" :params="[1024, 768]" />

          <figcaption>
            <h1>{{ page.headline || page.title }}</h1>
          </figcaption>
        </figure>
      </header>

      <div class="album-text text">
        <span v-html="page.description"></span>
        <p v-if="page.tags" class="album-tags tags">{{ tags }}</p>
      </div>

      <ul class="album-gallery" :data-even="gallery.length % 2 === 0" :data-count="gallery.length">
        <li v-for="image in gallery" :key="image.id">
          <figure>
            <a :href="image.content.link || image.url">
              <KirbyImage :file="image" thumb="crop" :params="[800, 1000]" />
            </a>
          </figure>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import page from '@/mixins/page'
import { tags } from '@/mixins/general'

export default {
  name: 'Album',
  mixins: [page, tags],
  data() {
    return {
      gallery: []
    }
  },
  async created() {
    await this.pageLoaded
    this.page.description = null

    const kt = await this.$api.getKirbyText(this.pageId, 'description')
    this.page.description = kt.description

    const files = await this.$api.getFiles(this.pageId)
    this.gallery = files.filter(file => file.type === 'image')
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