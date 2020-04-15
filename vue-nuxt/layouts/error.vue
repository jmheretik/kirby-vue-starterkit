<template>
  <main>
    <Intro :title="page.title" />

    <div v-if="page.text" class="text" v-html="page.text.html" />
  </main>
</template>

<script>
import page from '@/mixins/page'

export default {
  layout: 'default',
  mixins: [page],
  props: ['error'],

  // TODO replace with asyncData once it works at least in error layout (https://github.com/nuxt/nuxt.js/issues/3776)
  data() {
    return {
      page: null
    }
  },
  created() {
    this.page = !process.env.isStatic ? this.error.page : this.$api.getPage('error').then(page => (this.page = page))
  }
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
