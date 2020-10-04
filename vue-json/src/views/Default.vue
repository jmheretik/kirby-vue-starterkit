<template>
  <main>
    <Intro :title="page.title" />

    <div class="text" v-html="page.text.html" />
  </main>
</template>

<script>
import Intro from '../components/Intro'
import usePage from '../composables/page'

export default {
  name: 'Default',
  components: { Intro },
  setup: async () => ({ page: await usePage() })
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
