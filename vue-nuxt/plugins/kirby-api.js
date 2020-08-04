import axios from 'axios'
import _flattenDeep from 'lodash/flattenDeep'

let apiUrl

const getSite = async () => {
  const resp = await axios.get(`${apiUrl}/home.json`)
  const site = resp.data.site

  site.routes = _flattenDeep(site.children.map(page => [page.id, page.children.map(child => child.id)]))

  return site
}

const getPage = async id => {
  const resp = await axios.get(`${apiUrl}/${id}.json`)
  const page = resp.data
  const modifyPageHtml = (await import(`./modify-page-html-${process.client ? 'client' : 'server'}`)).default

  // fix relative links and img tags
  modifyPageHtml(page, html => {
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(process.env.NUXT_ENV_KIRBY_URL, process.env.NUXT_ENV_BASE_URL.slice(0, -1))
    }

    if (process.env.isStatic) {
      for (const img of html.getElementsByTagName('img')) {
        img.src = `${process.env.NUXT_ENV_BASE_URL}${process.env.NUXT_ENV_IMG_DIR}/${img.dataset.id}`
      }
    }
  })

  return page
}

const getFile = async url => {
  const resp = await axios.get(url, { responseType: 'stream' })

  return resp.data
}

export default {
  init: url => {
    apiUrl = url

    return {
      getSite,
      getPage,
      getFile
    }
  }
}
