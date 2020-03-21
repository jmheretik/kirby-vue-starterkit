<template>
  <main>
    <Intro :pageTitle="page.title" />

    <div class="text"><span v-html="page.text"></span></div>
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
