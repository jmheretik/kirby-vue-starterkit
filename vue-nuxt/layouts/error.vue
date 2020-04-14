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

  // TODO replace with asyncData once it works at least in error layout (https://github.com/nuxt/nuxt.js/issues/3776)
  data() {
    return {
      page: null
    }
  },
  created() {
    const pageId = !process.env.isStatic ? this.$root.context.app.$pageId : 'error'

    this.page = this.$api.getPage(pageId).then(page => (this.page = page))
  }
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
