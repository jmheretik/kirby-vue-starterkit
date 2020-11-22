<template>
  <main>
    <Intro :title="page.title" />

    <div class="notes">
      <article v-for="note in page.children" :key="note.uri" class="note">
        <header class="note-header">
          <nuxt-link :to="'/' + note.uri">
            <h2>{{ note.title }}</h2>
            <time>{{ note.date }}</time>
          </nuxt-link>
        </header>
      </article>
    </div>
  </main>
</template>

<script>
import page from '../../mixins/page'

export default {
  mixins: [page],
}
</script>

<style scoped>
.notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1.5rem;
  grid-auto-rows: 1fr;
}
.note {
  border: 2px solid #000;
}
.note a {
  display: block;
  padding: 1rem;
  line-height: 1.25em;
}
.note h2 {
  font-size: 1rem;
}
.note time {
  font-size: 0.75rem;
}
</style>
