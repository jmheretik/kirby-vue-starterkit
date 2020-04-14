<template>
  <main>
    <Intro :title="page.title" />

    <div class="text" v-if="page.text" v-html="page.text.html" />
  </main>
</template>

<script>
import page from '@/mixins/page'

export default {
  name: 'Default',
  mixins: [page]
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
