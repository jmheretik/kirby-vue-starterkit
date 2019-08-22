<template>
  <div id="app">
    <div class="page">
      <Header :site="site" />

      <router-view @change-title="updatePageTitle" />
    </div>

    <Footer :site="site" />
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
      site: {},
      pageTitle: null
    }
  },
  async created() {
    let site = await this.$api.get('site?select=title')

    // filter out unlisted pages
    const children = await this.$api.get('site/children?select=id,num,title,children')
    site.children = children.filter(child => child.num)

    this.site = site
    this.updateDocumentTitle()

    // set up routes
    let pageRoutes = []

    for (const page of this.site.children) {
      const componentName = page.id.charAt(0).toUpperCase() + page.id.slice(1)

      pageRoutes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${componentName}.vue`)
      })

      if (page.children.filter(child => child.num).length) {
        pageRoutes.push({
          path: '/' + page.id + '/:id',
          component: () => import(`@/views/${componentName}Sub.vue`)
        })
      }
    }

    this.$router.addRoutes(pageRoutes)
  },
  methods: {
    updatePageTitle(title) {
      this.pageTitle = title
      this.updateDocumentTitle()
    },
    updateDocumentTitle() {
      document.title = this.site.title + (this.pageTitle ? ' | ' + this.pageTitle : '')
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
