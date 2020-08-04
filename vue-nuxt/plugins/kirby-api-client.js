import KirbyApi from './kirby-api'

const apiUrl =
  process.env.NODE_ENV !== 'development' ? process.env.NUXT_ENV_KIRBY_URL : window.location.origin + process.env.NUXT_ENV_BASE_URL.slice(0, -1)

const api = KirbyApi.init(apiUrl)

const apiGetPage = api.getPage

api.getPage = async id => {
  const page = await apiGetPage(id)
  const modifyPageHtml = (await import(`./modify-page-html-${process.server ? 'server' : 'client'}`)).default

  modifyPageHtml(page, html => {
    // fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(process.env.NUXT_ENV_KIRBY_URL, process.env.NUXT_ENV_BASE_URL.slice(0, -1))
    }

    if (process.env.isStatic) {
      // point img tags to the downloaded copies
      for (const img of html.getElementsByTagName('img')) {
        img.src = `${process.env.NUXT_ENV_BASE_URL}${process.env.NUXT_ENV_IMG_DIR}/${img.dataset.id}`
      }
    }
  })

  return page
}

export default async ({ app }, inject) => {
  inject('api', api)
  inject('site', await api.getSite())
}
