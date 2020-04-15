const php = require('node-php-server')
import kirby from '../kirby.config'
import KirbyApi from './plugins/kirby-api'

const isProd = process.env.NODE_ENV === 'production'
const isStatic = process.env.NODE_ENV === 'generate'

const serveKirby = true
const injectKirby = true
const publicPath = '/'
const apiUrl = ''

process.env.NUXT_ENV_API_URL = apiUrl
process.env.NUXT_ENV_KIRBY_URL = apiUrl || `http://${kirby.host}:${kirby.port}`
process.env.NUXT_ENV_BASE_URL = publicPath

const api = KirbyApi.init(process.env.NUXT_ENV_KIRBY_URL)

// head attributes that need to be rendered server-side (e.g. Open Graph or Twitter meta tags)
const ssrHeadAttrs = { title: null, meta: [], __dangerouslyDisableSanitizers: [] }

if (isProd && injectKirby) {
  // PHP and Kirby is available
  ssrHeadAttrs.title = '<?= $site->title() . " | " . $page->title() ?>'

  // please read https://vue-meta.nuxtjs.org/api/#dangerouslydisablesanitizers
  ssrHeadAttrs.__dangerouslyDisableSanitizers.push('title')
}

if (!isProd && serveKirby) kirby.start(php)

export default {
  mode: 'spa',
  router: {
    base: publicPath
  },
  env: {
    isStatic
  },
  build: {
    publicPath: isProd && injectKirby ? kirby.assetsDir : '/_nuxt/'
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
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ...ssrHeadAttrs.meta
    ],
    link: [{ rel: 'icon', href: publicPath + 'favicon.ico' }],
    __dangerouslyDisableSanitizers: ssrHeadAttrs.__dangerouslyDisableSanitizers
  },
  plugins: ['plugins/kirby-api-client'],
  modules: ['@nuxtjs/proxy'],
  buildModules: ['@nuxtjs/eslint-module', ...(isStatic ? ['modules/kirby-scraper'] : []), ...(isProd && injectKirby ? ['modules/kirby-inject'] : [])],
  proxy: {
    '**/*.json': {
      target: process.env.NUXT_ENV_KIRBY_URL,
      pathRewrite: { [publicPath]: '/' }
    }
  },
  hooks: {
    generate: {
      done: () => {
        if (!isProd && serveKirby) kirby.stop(php)
      }
    }
  }
}
