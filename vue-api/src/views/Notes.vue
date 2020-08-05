<template>
  <main>
    <Intro :title="page.title" />

    <div class="notes">
      <article v-for="note in notes" :key="note.id" class="note">
        <header class="note-header">
          <router-link :to="'/' + note.id">
            <h2>{{ note.content.title }}</h2>
            <time>{{ note.content.date | format('day month year') }}</time>
          </router-link>
        </header>
      </article>
    </div>
  </main>
</template>

<script>
import page from '@/mixins/page'
import { formatDateTime } from '@/mixins/general'

export default {
  name: 'Notes',
  mixins: [page, formatDateTime],
  data() {
    return {
      notes: null
    }
  },
  async created() {
    await this.page

    const notes = await this.$api.getChildren(this.page.id)
    this.notes = notes.filter(note => note.status === 'listed').sort((a, b) => new Date(b.content.date) - new Date(a.content.date))
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
