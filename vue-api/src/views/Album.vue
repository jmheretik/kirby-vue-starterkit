<template>
  <main class="album">
    <article>
      <header>
        <figure v-if="page.cover" class="album-cover">
          <Suspense> <KirbyImage :file="page.cover[0]" thumb="crop" :params="[1024, 768]" /> </Suspense>

          <figcaption>
            <h1>{{ page.headline || page.title }}</h1>
          </figcaption>
        </figure>
      </header>

      <div class="album-text text">
        <span v-html="page.description" />

        <p v-if="page.tags" class="album-tags tags">{{ tags }}</p>
      </div>

      <ul class="album-gallery" :data-even="gallery.length % 2 === 0" :data-count="gallery.length">
        <li v-for="image in gallery" :key="image.url">
          <figure>
            <a :href="image.link || image.url">
              <Suspense> <KirbyImage :file="image" thumb="crop" :params="[800, 1000]" /> </Suspense>
            </a>
          </figure>
        </li>
      </ul>
    </article>
  </main>
</template>

<script>
import { usePage } from '../composables/use-page'
import { useKirby } from '../composables/use-kirby'
import { useTags } from '../composables/use-tags'
import KirbyImage from '../components/KirbyImage'

export default {
  name: 'Album',
  components: { KirbyImage },
  setup: async () => {
    const { getKirbyText, getFiles } = useKirby()
    const [page, kt, files] = await Promise.all([usePage(), getKirbyText('description'), getFiles()])

    return {
      page: { ...page, ...kt },
      tags: useTags(page),
      gallery: files.filter(file => file.type === 'image')
    }
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
