<template>
  <main>
    <Intro :title="page.title" />

    <div class="text" v-html="page.text" />
  </main>
</template>

<script>
import page from '@/mixins/page'

export default {
  name: 'Default',
  mixins: [page],
  async created() {
    await this.page
    this.page.text = null

    const { text } = await this.$api.getKirbyText(this.page.id, 'text')
    this.page.text = text
  }
}
</script>

<style scoped>
.text {
  max-width: 35rem;
  margin: 0 auto;
}
</style>
