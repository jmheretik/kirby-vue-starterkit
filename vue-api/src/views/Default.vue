<template>
  <main>
    <Intro :title="page.title" />

    <div class="text" v-html="page.text" />
  </main>
</template>

<script>
import { usePage } from '../composables/use-page'
import { useKirby } from '../composables/use-kirby'
import Intro from '../components/Intro'

export default {
  name: 'Default',
  components: { Intro },
  setup: async () => ({ page: Object.assign({}, ...(await Promise.all([usePage(), useKirby().getKirbyText('text')]))) })
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
