<template>
  <div id="app">
    <div class="page">
      <Header :site="site" />
      <router-view :api="api" @change-title="updateTitle" />
    </div>
    <Footer :api="api" :site="site" />
  </div>
</template>

<script>
import Api from '@/api'
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
      api: new Api(),
      site: {}
    }
  },
  async created() {
    const site = await this.api.get('site?select=title')
    const pgs = await this.api.get('site/children?select=id,num,title,children')

    // filter out unlisted
    site.children = pgs.filter(child => child.num)

    for (const page of site.children) {
      page.children = page.children.filter(child => child.num)
    }

    // set up routes
    let pageRoutes = []

    for (const page of site.children) {
      const componentName = page.id.charAt(0).toUpperCase() + page.id.slice(1)

      pageRoutes.push({
        path: '/' + page.id,
        component: () => import(`@/views/${componentName}.vue`)
      })

      if (page.children.length) {
        pageRoutes.push({
          path: '/' + page.id + '/:id',
          component: () => import(`@/views/${componentName}Sub.vue`)
        })
      }
    }

    this.site = site
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
</style>
