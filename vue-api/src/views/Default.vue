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
  mixins: [page],
  async created() {
    await this.pageLoaded
    this.page.text = null

    const kt = await this.$api.getKirbyText(this.pageId, 'text')
    this.page.text = kt.text
  }
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
