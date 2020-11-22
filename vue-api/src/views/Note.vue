<template>
  <main>
    <article class="note">
      <header class="note-header intro">
        <h1>{{ page.title }}</h1>
        <time class="note-date">{{ format(page.date, 'day month year') }}</time>
        <p v-if="page.tags" class="note-tags tags">{{ tags }}</p>
      </header>

      <div class="note-text text" v-html="page.text" />
    </article>
  </main>
</template>

<script>
import { usePage } from '../composables/use-page'
import { useKirby } from '../composables/use-kirby'
import { useTags } from '../composables/use-tags'
import { DateTimeUtils } from '../utils/datetime.utils'

export default {
  name: 'Note',
  setup: async () => {
    const page = Object.assign({}, ...(await Promise.all([usePage(), useKirby().getKirbyText('text')])))

    return {
      page,
      tags: useTags(page),
      format: DateTimeUtils.format
    }
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
:deep(.gallery) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 3rem 0;
}
:deep(.gallery figure a) {
  border: 0;
}
:deep(.gallery figure) {
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 45rem) {
  :deep(.gallery) {
    margin-left: -3rem;
    margin-right: -3rem;
  }
}
</style>
