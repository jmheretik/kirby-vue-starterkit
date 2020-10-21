import { modifyPageHtml } from '../utils/modify-page-html'
import { useLanguage } from '../composables/use-language'

export const useKirby = () => {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_KIRBY_URL : window.location.origin + process.env.VUE_APP_BASE_URL

  const toPageId = path => {
    if (path.startsWith('/')) path = path.slice(1)
    if (path.endsWith('/')) path = path.slice(0, -1)

    return path || 'home'
  }

  const getLanguages = async () => {
    const resp = await fetch(`${baseUrl}languages.json`)
    const languages = await resp.json()

    return languages
  }

  const getSite = async () => {
    const { prefix } = useLanguage()

    const resp = await fetch(`${baseUrl}${prefix}/home.json`)
    const home = await resp.json()

    return home.site
  }

  const getPage = async path => {
    const { prefix } = useLanguage()

    const resp = await fetch(`${baseUrl}${prefix}/${toPageId(path)}.json`)
    const page = await resp.json()

    // fix relative links
    modifyPageHtml(page, html => {
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.href.replace(process.env.VUE_APP_KIRBY_URL, process.env.VUE_APP_BASE_URL.slice(0, -1))
      }
    })

    return page
  }

  return {
    getLanguages,
    getSite,
    getPage
  }
}
