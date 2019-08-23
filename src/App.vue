<template>
  <div id="app">
    <div class="page">
      <Header :pages="pages" />

      <router-view @update-title="updateDocumentTitle" />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      pages: []
    }
  },
  async created() {
    // filter listed pages and find out their templates
    const pages = await this.$api.get('site/children?select=id,num,template,title,hasChildren')
    this.pages = pages.filter(page => page.num)

    // find out child page templates
    for (let page of this.pages.filter(page => page.hasChildren)) {
      const childPages = await this.$api.get(`pages/${page.id}/children?select=template`)
      page.childTemplate = childPages[0].template
    }

    // set up routes
    let pageRoutes = []
    const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

    for (const page of this.pages) {
      pageRoutes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${capitalize(page.template)}.vue`)
      })

      if (page.hasChildren) {
        pageRoutes.push({
          path: '/' + page.id + '/:id',
          component: () => import(`@/views/${capitalize(page.childTemplate)}.vue`)
        })
      }
    }

    this.$router.addRoutes(pageRoutes)
  },
  methods: {
    updateDocumentTitle(pageTitle) {
      document.title = `${this.$site} | ${pageTitle}`
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
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
</style>
