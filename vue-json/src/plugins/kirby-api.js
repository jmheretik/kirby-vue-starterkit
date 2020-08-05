import modifyPageHtml from '@/plugins/modify-page-html'

let apiUrl

const toPageId = path => {
  if (path.startsWith('/')) path = path.slice(1)
  if (path.endsWith('/')) path = path.slice(0, -1)

  return path || 'home'
}

const getSite = async () => {
  const resp = await fetch(`${apiUrl}/home.json`)
  const home = await resp.json()

  return home.site
}

const getPage = async path => {
  const resp = await fetch(`${apiUrl}/${toPageId(path)}.json`)
  const page = await resp.json()

  // fix relative links
  modifyPageHtml(page, html => {
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(process.env.VUE_APP_KIRBY_URL, process.env.VUE_APP_BASE_URL.slice(0, -1))
    }
  })

  return page
}

export default {
  init: url => {
    apiUrl = url

    return {
      getSite,
      getPage
    }
  }
}
