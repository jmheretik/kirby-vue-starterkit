<template>
  <main>
    <article class="note">
      <header class="note-header intro">
        <h1>{{ page.title }}</h1>
        <time class="note-date">{{ page.date | moment('DD MMMM YYYY') }}</time>
        <p v-if="page.tags" class="note-tags tags">{{ tags }}</p>
      </header>

      <div class="note-text text"><span v-html="page.text"></span></div>
    </article>
  </main>
</template>

<script>
export default {
  name: 'NotesSub',
  data() {
    return {
      page: {}
    }
  },
  computed: {
    tags() {
      return this.page.tags.map(e => e.text).join(', ')
    }
  },
  async created() {
    const pageId = `notes+${this.$route.params.id}`
    const page = await this.$api.get(`pages/${pageId}?select=content`)
    const kt = await this.$api.get(`kt/${pageId}?select=text`)
    page.content.text = kt.text.value

    this.page = page.content
    this.$emit('change-title', this.page.title)
  }
}
</script>

<style scoped>
.note {
  max-width: 35rem;
  margin: 0 auto;
}
.note-header {
  text-align: center;
}
.note-date {
  margin-bottom: 0.5rem;
  display: block;
}

/*  
    deep selectors for v-html content
    https://vue-loader.vuejs.org/guide/scoped-css.html#dynamically-generated-content
*/
span >>> .gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 3rem 0;
}
span >>> .gallery figure a {
  border: 0;
}
span >>> .gallery figure {
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 45rem) {
  span >>> .gallery {
    margin-left: -3rem;
    margin-right: -3rem;
  }
}
</style>
