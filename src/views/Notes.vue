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
import Intro from '@/components/Intro.vue'

export default {
  name: 'Notes',
  props: ['api'],
  components: {
    Intro
  },
  data() {
    return {
      page: {},
      notes: {}
    }
  },
  async created() {
    const page = await this.api.get('pages/notes?select=title')
    const notes = await this.api.get('pages/notes/children?select=id,content')
    notes.sort((a, b) => new Date(b.content.date) - new Date(a.content.date))

    this.page = page
    this.notes = notes
    this.$emit('change-title', this.page.title)
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
