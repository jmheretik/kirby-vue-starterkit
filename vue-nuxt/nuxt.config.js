import php from 'php-server'
import kirby from '../kirby.config'
import { useKirby } from './composables/use-kirby'
require('dotenv-flow').config({ purge_dotenv: true })

const isProd = process.env.NODE_ENV === 'production'
const isStatic = process.env.NODE_ENV === 'static'

export default async () => {
  let server, site, errorPage

  if (isStatic) {
    const { getSite, getPage } = useKirby()

    server = await kirby.start(php)
    site = await getSite()
    errorPage = await getPage('error')
    server.stop()
  }

  return {
    ssr: false,
    target: isStatic ? 'static' : 'server',
    router: { base: process.env.NUXT_ENV_BASE_URL },
    head: {
      // PHP and Kirby is available (e.g. for values that need to be rendered server-side, such as Open Graph or Twitter meta tags)
      // please read https://vue-meta.nuxtjs.org/api/#dangerouslydisablesanitizers
      title: '<?= $site->title() ?> | <?= $page->title() ?>',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
      link: [{ rel: 'icon', href: process.env.NUXT_ENV_BASE_URL + 'favicon.ico' }],
      __dangerouslyDisableSanitizers: ['title'],
    },
    env: { ...(isStatic ? { isStatic, site, errorPage } : {}) },
    build: { ...(isProd && kirby.inject ? { publicPath: kirby.assetsDir } : {}) },
    generate: {
      ...(isStatic
        ? {
            routes: site.children.filter((page) => !page.isListed).map((page) => '/' + page.uri),
            fallback: '404.html',
          }
        : {
            exclude: [/.*/],
            fallback: 'index.html',
          }),
    },
    components: true,
    plugins: ['plugins/inject-globals'],
    modules: ['@nuxtjs/proxy'],
    buildModules: [
      '@nuxtjs/eslint-module',
      ['@nuxtjs/router', { path: 'router', fileName: 'index.js', keepDefaultRouter: true }],
      ...(isStatic ? [['modules/kirby-scraper']] : []),
      ...(isProd && kirby.inject ? ['modules/kirby-inject'] : []),
    ],
    proxy: {
      '**/*.json': {
        target: process.env.NUXT_ENV_KIRBY_URL,
        pathRewrite: { [process.env.NUXT_ENV_BASE_URL]: '/' },
      },
    },
    hooks: {
      ready: async () => {
        if (!isProd && kirby.serve) server = await kirby.start(php)
      },
      close: () => {
        if (!isProd && kirby.serve) server.stop()
      },
    },
  }
}
