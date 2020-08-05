import axios from 'axios'

let apiUrl

const toPageId = path => {
  if (path.startsWith('/')) path = path.slice(1)
  if (path.endsWith('/')) path = path.slice(0, -1)

  return path || 'home'
}

const getSite = async () => {
  const resp = await axios.get(`${apiUrl}/home.json`)

  return resp.data.site
}

const getPage = async path => {
  const { data: page } = await axios.get(`${apiUrl}/${toPageId(path)}.json`)
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
