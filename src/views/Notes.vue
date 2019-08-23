<template>
  <main>
    <Intro :pageTitle="page.title" />

    <div class="notes">
      <article v-for="note in notes" :key="note.id" class="note">
        <header class="note-header">
          <router-link :to="'/' + note.id">
            <h2>{{ note.content.title }}</h2>
            <time>{{ note.content.date | moment('DD MMMM YYYY') }}</time>
          </router-link>
        </header>
      </article>
    </div>
  </main>
</template>

<script>
import page from '@/components/mixins/page'
import Intro from '@/components/Intro.vue'

export default {
  name: 'Notes',
  mixins: [page],
  components: {
    Intro
  },
  data() {
    return {
      notes: []
    }
  },
  async created() {
    let notes = await this.getListedChildren()
    notes.sort((a, b) => new Date(b.content.date) - new Date(a.content.date))
    this.notes = notes
  }
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
