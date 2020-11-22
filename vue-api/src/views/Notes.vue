<template>
  <main>
    <Intro :title="page.title" />

    <div class="notes">
      <article v-for="note in notes" :key="note.slug" class="note">
        <header class="note-header">
          <router-link :to="`/${page.slug}/${note.slug}`">
            <h2>{{ note.title }}</h2>
            <time>{{ format(note.date, 'day month year') }}</time>
          </router-link>
        </header>
      </article>
    </div>
  </main>
</template>

<script>
import { usePage } from '../composables/use-page'
import { useKirby } from '../composables/use-kirby'
import { DateTimeUtils } from '../utils/datetime.utils'
import Intro from '../components/Intro'

export default {
  name: 'Notes',
  components: { Intro },
  setup: async () => {
    const [page, notes] = await Promise.all([usePage(), useKirby().getChildren()])

    return {
      page,
      notes: notes.filter(note => note.status === 'listed').sort((a, b) => new Date(b.date) - new Date(a.date)),
      format: DateTimeUtils.format
    }
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
