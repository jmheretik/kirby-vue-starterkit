import KirbyApi from './kirby-api'
import modifyPageHtml from './modify-page-html'

const api = KirbyApi.init(
  !process.env.isStatic
    ? process.env.NUXT_ENV_API_URL || (window.location.origin + process.env.NUXT_ENV_BASE_URL).slice(0, -1)
    : process.env.NUXT_ENV_KIRBY_URL
)

const apiGetPage = api.getPage

api.getPage = async id => {
  // TODO remove once full static generation is supported (https://github.com/nuxt/rfcs/issues/22)
  const page = await (!process.env.isStatic ? apiGetPage(id) : require(`../tmp/${id}.json`))

  if (!process.env.isStatic) {
    modifyPageHtml(page, document, html => {
      // fix relative links
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.href.replace(process.env.NUXT_ENV_KIRBY_URL, process.env.NUXT_ENV_BASE_URL.slice(0, -1))
      }
    })
  }

  return page
}

export default async ({ app }, inject) => {
  inject('api', api)
  inject('site', (await api.getPage('home')).site)
}
