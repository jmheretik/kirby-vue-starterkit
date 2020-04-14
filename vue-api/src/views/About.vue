<template>
  <main>
    <Intro :pageTitle="page.title" />

    <div class="layout">
      <aside>
        <section>
          <h2>Address</h2>
          <div class="text">
            <span v-html="page.address"></span>
          </div>
        </section>

        <section>
          <h2>Email</h2>
          <div class="text">
            <a :href="'mailto:' + page.email">{{ page.email }}</a>
          </div>
        </section>

        <section>
          <h2>Phone</h2>
          <div class="text">
            <a :href="'tel:' + page.phone">{{ page.phone }}</a>
          </div>
        </section>
        <section>
          <h2>On the web</h2>
          <div class="text">
            <ul>
              <li v-for="social in page.social" :key="social.id">
                <a :href="social.url">{{ social.platform }}</a>
              </li>
            </ul>
          </div>
        </section>
      </aside>

      <div class="text">
        <span v-html="page.text"></span>
      </div>
    </div>
  </main>
</template>

<script>
import page from '@/mixins/page'

export default {
  name: 'About',
  mixins: [page],
  async created() {
    await this.pageLoaded
    this.page.address = this.page.text = null

    const kts = await this.$api.getKirbyText(this.pageId, 'address', 'text')
    this.page.address = kts.address
    this.page.text = kts.text
  }
}
</script>

<style>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 3rem;
}

@media screen and (min-width: 45rem) {
  .layout {
    grid-template-columns: 1fr 2fr;
  }
}

.layout aside section {
  margin-bottom: 3rem;
}

.layout aside h2 {
  margin-bottom: 0.75rem;
}
</style>
