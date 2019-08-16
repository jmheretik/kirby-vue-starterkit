<template>
  <div id="app" class="page">
    <Header :site="site" />
    <router-view :api="api" @change-title="updateTitle" />
  </div>
</template>

<script>
import Api from '@/api'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      api: new Api(),
      site: {}
    }
  },
  async created() {
    const site = await this.api.get('site?select=title,children')
    site.children = site.children.filter(child => child.num)
    this.site = site

    let pageRoutes = []

    for (const page of site.children) {
      const componentName = page.id.charAt(0).toUpperCase() + page.id.slice(1)

      pageRoutes.push({
        path: '/' + page.id,
        name: page.id,
        component: () =>
          import(/* webpackChunkName: "page" */ `@/views/${componentName}.vue`)
      })
    }

    this.$router.addRoutes(pageRoutes)
  },
  methods: {
    updateTitle(pageTitle) {
      document.title = `${this.site.title} | ${pageTitle}`
    }
  }
}
</script>

<style>
:root {
  --content-width: 65rem;
}

*,
*:after,
*:before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

li {
  list-style: none;
}

a {
  color: currentColor;
  text-decoration: none;
}

strong,
b {
  font-weight: 500;
}

img {
  width: 100%;
}

.page {
  padding: 5vh 5vw 10vh;
}
.page > * {
  max-width: var(--content-width);
  margin: 0 auto;
}

main {
  min-height: calc(100vh - 10rem);
}

.tags {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.075em;
  font-size: 0.75rem;
  font-weight: 600;
}

.text {
  line-height: 1.5em;
}
.text p,
.text figure,
.text ul,
.text ol {
  margin-bottom: 1.5em;
}
.text h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.text > *:first-child {
  margin-top: 0;
}
.text a {
  position: relative;
  white-space: nowrap;
  font-weight: 500;
  z-index: 1;
  display: inline-block;
  border-bottom: 2px solid #000;
}
.text figure {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.text img {
  width: 100%;
}

.footer {
  padding: 1.5rem 5vw 10vh;
  text-align: center;
  max-width: var(--content-width);
  margin: 0 auto;
  line-height: 1.5em;
}
.footer a {
  display: inline-block;
  font-size: 0.875rem;
}
.footer > a {
  margin-bottom: 1.5rem;
  border-top: 2px solid #000;
  width: 16.5rem;
  padding-top: 0.5rem;
}

.social a {
  margin: 0 0.75rem;
  padding: 0.5rem 1rem;
  border: 2px solid #000;
  width: 7.5rem;
}
.social a:hover {
  background: #000;
  color: #fff;
}
</style>
