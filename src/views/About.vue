<template>
  <main>
    <Intro :pageTitle="page.title" />
  </main>
</template>

<script>
import Intro from '@/components/Intro.vue'

export default {
  name: 'About',
  props: ['api'],
  components: {
    Intro
  },
  data() {
    return {
      page: {}
    }
  },
  async created() {
    const page = await this.api.get('pages/about')
    this.page = page

    this.$emit('change-title', page.title)
  }
}
</script>
