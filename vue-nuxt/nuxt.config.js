import config from './kirby.config'
import KirbyApi from './plugins/kirby-api'

const isProd = process.env.NODE_ENV === 'production'
const isStatic = process.env.NODE_ENV === 'generate'

// head attributes that need to be rendered server-side (e.g. Open Graph or Twitter meta tags)
const ssrHeadAttrs = { title: null, meta: [], __dangerouslyDisableSanitizers: [] }

if (isProd && config.injectKirby) {
  // PHP and Kirby is available
  ssrHeadAttrs.title = '<?= $site->title() . " | " . $page->title() ?>'

  // please read https://vue-meta.nuxtjs.org/api/#dangerouslydisablesanitizers
  ssrHeadAttrs.__dangerouslyDisableSanitizers.push('title')
}

const publicPath = config.publicPath

const apiUrl = config.getApiUrl()
const api = KirbyApi.init(apiUrl)

if (!isProd && config.serveLocalBackend) config.serveBackend()

export default {
  mode: 'spa',
  router: {
    base: publicPath
  },
  env: {
    apiUrl,
    publicPath,
    isStatic
  },
  build: {
    publicPath: isProd && config.injectKirby ? config.kirbyAssetsDir : '/_nuxt/'
  },
  generate: {
    routes: isStatic ? () => api.getPage('home').then(home => home.site.routes.map(route => '/' + route)) : [],
    exclude: isStatic ? [] : [/.*/],
    fallback: isStatic ? '404.html' : 'index.html'
  },
  head: {
    htmlAttrs: { lang: 'en' },
    title: ssrHeadAttrs.title,
    meta: [
      ...ssrHeadAttrs.meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [{ rel: 'icon', href: publicPath + 'favicon.ico' }],
    __dangerouslyDisableSanitizers: ssrHeadAttrs.__dangerouslyDisableSanitizers
  },
  plugins: ['plugins/kirby-api-client'],
  buildModules: ['@nuxtjs/eslint-module', 'modules/kirby-scraper', 'modules/kirby-inject'],
  hooks: {
    generate: {
      done: () => {
        if (!isProd && config.serveLocalBackend) config.closeBackend()
      }
    }
  }
}
